# Karabiner-Human-Config

## Generate Karabiner-Elements configuration files with human-readable syntax

Creating configuration files for [Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements) can be challenging. With Karabiner-Human-Config (KHC), you can effortlessly generate your own configuration files via human-readable syntax for use with Karabiner-Elements.

## Usage

Just create a new configuration file `karabiner.human.json`:

```json
{
  "fn spacebar": "left_command spacebar"
}
```

And run the following command:

```bash
npx khc
```

<details><summary>Generated: karabiner.json</summary><br/><pre>
{
  "global": {
    "show_in_menu_bar": false
  },
  "profiles": [
    {
      "complex_modifications": {
        "rules": [
          {
            "manipulators": [
              {
                "type": "basic",
                "description": "fn spacebar",
                "from": {
                  "key_code": "spacebar",
                  "modifiers": {
                    "mandatory": [
                      "fn"
                    ]
                  }
                },
                "to": [
                  {
                    "key_code": "spacebar",
                    "modifiers": [
                      "left_command"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      "name": "nrjdalal",
      "selected": true,
      "virtual_hid_keyboard": {
        "keyboard_type_v2": "ansi"
      }
    }
  ]
}
</pre></details>

<br/>

The generated configuration, will be logged to the console.
You can then manually copy and paste it into your `karabiner.json` file.

<!-- For automatic writing of the generated configuration to your `karabiner.json` file, use the `-w` flag. -->
