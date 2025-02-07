# Karabiner-Human-Config

## A human-readable configuration generator for Karabiner-Elements

Creating configuration files for [Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements) can be challenging. With Karabiner-Human-Config (KHC), you can effortlessly generate your own configuration files using human-readable/understandable syntax.

## Usage

Just create a new configuration file `karabiner.human.json`:

```json
{
  "fn": { "to": "fn", "to_if_alone": "left_command tab" },
  "fn spacebar": "left_command spacebar",
  "fn v": "$ open '/Applications/Visual Studio Code.app'",
  "left_command left_control left_option left_shift spacebar": "left_command spacebar",
  "caps_lock": {
    "to": "left_command left_control left_option left_shift",
    "to_if_alone": "100 caps_lock"
  }
}
```

And run the following command:

```bash
npx karabiner-human-config
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
                "description": "fn",
                "from": {
                  "key_code": "fn"
                },
                "to": [
                  {
                    "key_code": "fn"
                  }
                ],
                "to_if_alone": [
                  {
                    "key_code": "tab",
                    "modifiers": [
                      "left_command"
                    ]
                  }
                ]
              }
            ]
          },
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
          },
          {
            "manipulators": [
              {
                "type": "basic",
                "description": "fn v",
                "from": {
                  "key_code": "v",
                  "modifiers": {
                    "mandatory": [
                      "fn"
                    ]
                  }
                },
                "to": [
                  {
                    "shell_command": "open '/Applications/Visual Studio Code.app'"
                  }
                ]
              }
            ]
          },
          {
            "manipulators": [
              {
                "type": "basic",
                "description": "left_command left_control left_option left_shift spacebar",
                "from": {
                  "key_code": "spacebar",
                  "modifiers": {
                    "mandatory": [
                      "left_command",
                      "left_control",
                      "left_option",
                      "left_shift"
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
          },
          {
            "manipulators": [
              {
                "type": "basic",
                "description": "caps_lock",
                "from": {
                  "key_code": "caps_lock"
                },
                "to": [
                  {
                    "key_code": "left_shift",
                    "modifiers": [
                      "left_command",
                      "left_control",
                      "left_option"
                    ]
                  }
                ],
                "to_if_alone": [
                  {
                    "hold_down_milliseconds": 100,
                    "key_code": "caps_lock"
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

## Advanced Usage for From Events

### Optional Modifiers

Use `|` to specify a shell command.

```diff
{
-  "fn spacebar: "left_command spacebar"
+  "fn spacebar | any": "left_command spacebar"
}
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
                    ],
                    "optional": [
                      "any"
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

## Advanced Usage for To Events

### Shell Commands

Use `$` to specify a shell command.

```diff
{
-  "fn spacebar": "left_command spacebar"
+  "fn spacebar": "$ open -a 'Google Chrome'"
}
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
                    "shell_command": "open -a 'Google Chrome'"
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

### Specify Delay and Flags

Use `lazy`, `repeat`, `halt` to set flags. Or `number` to specify a delay.

> Use only what you need. If you don't need a delay or any flags, don't specify them.

```diff
{
-  "fn spacebar": "left_command spacebar"
+  "fn spacebar": "100 lazy repeat halt left_command spacebar"
}
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
                    "lazy": true,
                    "repeat": true,
                    "halt": true,
                    "hold_down_milliseconds": 100,
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

### Specify Multiple Events

Use object insetad of string `{ to: ..., to_if_alone: ... }` to specify multiple to events.

```diff
{
-  "fn spacebar": "left_command spacebar"
+  "fn": { "to": "fn", "to_if_alone": "left_command tab" }
}
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
                "description": "fn",
                "from": {
                  "key_code": "fn"
                },
                "to": [
                  {
                    "key_code": "fn"
                  }
                ],
                "to_if_alone": [
                  {
                    "key_code": "tab",
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
