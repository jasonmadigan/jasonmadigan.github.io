---
title: Lightweight, fast Rails stack - Thin & nginx
date: 2008-01-24T21:00:00
---

Since purchasing a
<a href="http://www.slicehost.com" title="http://www.slicehost.com">slice
of heaven</a> a few days ago, I've setup a very lightweight Rails stack
consisting of
<a href="http://code.macournoyer.com/thin/" title="http://code.macournoyer.com/thin/">Thin</a>
& <a href="http://nginx.net/" title="http://nginx.net/">nginx</a> for my
Rails needs. Since I went for a slice with just 256MB of RAM, memory
consumption becomes a pretty serious issue. nginx has been around for
quite a while now, and has recently started to become more and more
popular in Rails deployments due to the fact that's incredibly
lightweight, very fast and stable - perfect not only for VPS jerks like
me, but for anyone who really doesn't feel it's necessary to run Apache
for static content/cluster proxying/load balancing. Thin is something I
came across very recently and I decided to try is as a replacement for
mongrel since I'd heard some great things about it, even if it is still
alpha. It's performance in comparison to mongrel (even with a tacked on
event machine) looks very impressive on paper.

Setting up clustering with it is a snap, just spawn the processes and
pipe them into nginx. Here's a startup script borrowed from
<a href="http://groups.google.com/group/thin-ruby/msg/7775cc00e316b25a" title="http://groups.google.com/group/thin-ruby/msg/7775cc00e316b25a">Stephen
Celis</a>:

```ruby
namespace :thin do
 namespace :cluster do desc 'Start thin cluster'
 task :start => :environment do
 `cd #{RAILS_ROOT}`
 port_range = RAILS_ENV == 'development' ? 3 : 8
 (ENV['SIZE'] ? ENV['SIZE'].to_i : 4).times do |i|
 Thread.new do
 port = ENV['PORT'] ? ENV['PORT'].to_i + i : ("#{port_range}%03d"  i)
          str  = "thin start -d -p#{port} -Ptmp/pids/thin-#{port}.pid"
          str += " -e#{RAILS_ENV}"
          puts str
          puts "Starting server on port #{port}..."
          `#{str}`
        end
      end
    end
    desc 'Stop all thin clusters'
    task :stop => :environment do
      `cd #{RAILS_ROOT}`
      Dir.new("#{RAILS_ROOT}/tmp/pids").each do |file|
        Thread.new do
          if file.starts_with?("thin-")
            str  = "thin stop -Ptmp/pids/#{file}"
            puts "Stopping server on port #{file[/\d+/]}..."
            `#{str}`
          end
        end
      end
    end
  end
end
```

Then spawn however many processes you want using something like:

```bash
rake thin:cluster:start RAILS_ENV=production SIZE=2 PORT=3000
```

To stop them, use:

```bash
rake thin:cluster:stop
```

With that all nicely setup, you can use an nginx config similar to mine to get things in order:

```nginx
upstream dapperjerk {
  server 127.0.0.1:3000;
  server 127.0.0.1:3001;
  }

server {
  listen 80;
  server_name  www.dapperjerk.com;
  rewrite \^/(.\*) http://dapperjerk.com permanent;
}

server {
  listen   80;
  server_name dapperjerk.com;

  access_log /home/jason/public_html/blog/log/access.log;
  error_log /home/jason/public_html/blog/log/error.log;

  root   /home/jason/public_html/blog/public/;
  index  index.html;

  location / {
    proxy_set_header  X-Real-IP  $remote_addr;
    proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy\_redirect false;

    if (-f $request_filename/index.html) {
      rewrite (.*) $1/index.html break;
    }

    if (-f $request_filename.html) {
      rewrite (.*) $1.html break;
    }

    if (!-f $request_filename) {
      proxy_pass http://dapperjerk;
      break;
    }
  }

}
```

And that's really all there is too it. I'm not a masochist so I've never
bothered to fully read Apache's documentation, but I don't think I'm
going out on a limb here by saying that it seems to be a lot easier to
manage nginx. I haven't really put thin through its paces yet, but we'll
see in the coming weeks as I cobble together a custom blog app to run
this place.
