---
title: "Adding shopping list items via Home Assistant voice commands"
date: 2025-01-01T12:00:00
categories: scripting
---

I recently got access to a couple of [Home Assistant Voice Previews](https://www.home-assistant.io/voice-pe/), and wanted a way to quickly add items to my shopping list using voice commands. The built-in intents for adding todo list items are kind of wordy, and I liked how Alexa had a simple "Alexa add foo" shortcut to add items to a default shopping list.

After some tinkering, I came up with a simple setup that uses Home Assistant’s `conversation` integration, `intent_script`, and a few custom sentences to streamline the process.

### The Configuration

The core of the setup relies on Home Assistant’s [intent scripts](https://www.home-assistant.io/integrations/intent_script/). Here is one to handle a new `ShoppingListAddItem` intent, and associated action to trigger from an intent:

```yaml
# configuration.yaml
conversation:
  intents: {}

intent_script:
  ShoppingListAddItem:
    action:
      action: todo.add_item
      target:
        entity_id: todo.shopping_list
      data:
        item: "{{ shop_item }}"
    speech:
      text: "{{ shop_item }} added to your shopping list."
```

This defines an action to add the spoken item (e.g., "milk") to the `todo.shopping_list` entity and responds with a confirmation.

### Custom Sentences

To make the voice command intuitive, I defined custom sentences in a separate file (`shopping_list.yaml`):

```yaml
# custom_sentences/en/shopping_list.yaml

language: "en"
intents:
  ShoppingListAddItem:
    data:
      - sentences:
          - "Add {shop_item}"
lists:
  shop_item:
    wildcard: true
```

This setup captures any item spoken after "Add" and maps it to the `shop_item` variable, which is then passed to the `ShoppingListAddItem` intent script, adding the item via a service call / action.

### How It Works

1. **You Say**: “Add milk”
2. **Home Assistant Matches**: Home Assistant matches your spoken sentence to the `ShoppingListAddItem` intent using the custom sentence.
3. **Intent Script Runs**: The intent script processes the `shop_item` variable, adds the item to the shopping list, and confirms with a spoken response.

This largely mirrors the simplicity of Alexa’s "Add foo" command but keeps everything local.
