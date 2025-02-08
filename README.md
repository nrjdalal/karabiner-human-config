# Karabiner-Human-Config

## A human-readable configuration generator for Karabiner-Elements

Creating configuration files for [Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements) can be challenging. With Karabiner-Human-Config (KHC), you can effortlessly generate your own configuration files using human-readable/understandable syntax.

## Usage

Just create a new configuration file `karabiner.human.json`:

- Don't hold back on the comments.
- Use [custom aliases](#custom-aliases) like `hyper` `lcmd` etc.
- Use app names and stop worrying about finding bundle identifiers.
- Use `t`, `a`, `h` for to, to_if_alone, and to_if_held_down and [more](#manipulator-keys-aliases).

```json
{
  // hyper key bindings
  "hyper spacebar": "left_command spacebar",
  "caps_lock": { "to": "hyper", "to_if_alone": "100 caps_lock" },
  // function key bindings
  "fn": { "to": "fn", "to_if_alone": "left_command tab" },
  "fn spacebar": "left_command spacebar",
  "fn v": "$ open -a 'Visual Studio Code'",
  // visual studio code specific bindings
  "Visual Studio Code": {
    "fn grave_accent_and_tilde": "left_control grave_accent_and_tilde"
  }
}
```

And run the following command:

```bash
npx karabiner-human-config
```

And voila! From 10 lines to 170+ lines of configuration in just a few seconds.

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
                "description": "hyper spacebar",
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
                    "key_code": "caps_lock",
                    "hold_down_milliseconds": 100
                  }
                ]
              }
            ]
          },
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
                    "shell_command": "open -a 'Visual Studio Code'"
                  }
                ]
              }
            ]
          },
          {
            "manipulators": [
              {
                "type": "basic",
                "description": "visual studio code fn grave_accent_and_tilde",
                "from": {
                  "key_code": "grave_accent_and_tilde",
                  "modifiers": {
                    "mandatory": [
                      "fn"
                    ]
                  }
                },
                "to": [
                  {
                    "key_code": "grave_accent_and_tilde",
                    "modifiers": [
                      "left_control"
                    ]
                  }
                ],
                "conditions": [
                  {
                    "type": "frontmost_application_if",
                    "bundle_identifiers": [
                      "^com\\.microsoft\\.VSCode$"
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

- Auto write and specifing path is coming soon.

## Table of Contents

- [Usage](#usage)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [App Names for Specific Bindings](#app-names-for-specific-bindings)
- [Advanced Usage for From Events](#advanced-usage-for-from-events)
  - [Optional Modifiers](#optional-modifiers)
- [Advanced Usage for To Events](#advanced-usage-for-to-events)
  - [Shell Commands](#shell-commands)
  - [Specify Delay and Flags](#specify-delay-and-flags)
  - [Specify Multiple Events](#specify-multiple-events)
- [Custom Aliases](#custom-aliases)
- [Manipulator Key's Aliases](#manipulator-keys-aliases)
- [Future Considerations](#future-considerations)

<br/>

## App Names for Specific Bindings

```json
{
  // ... rest of configuration
  "Visual Studio Code": {
    // ... app specific configuration
  },
  "Google Chrome": {
    // ... app specific configuration
  }
  // ... rest of configuration
}
```

Bonus: You can use app names instead of bundle identifiers. Let KHC handle the rest.

<br/>

## Advanced Usage for From Events

### Optional Modifiers

Use `|` to specify optional modifiers.

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

<br/>

## Custom Aliases

- hyper: `left_command left_control left_option left_shift`
- left_command: `lcmd` `l_cmd` `left_cmd`

Check out [custom-aliases.ts](constants/custom-aliases.ts) for more.

## Manipulator Key's Aliases

- `t` for `to`
- `a` for `to_if_alone`
- `h` for `to_if_held_down`

Check out [manipulator-keys.ts](constants/manipulator-keys.ts) for more.

## Future Considerations

- support for variables
- you tell me, I just got to know about Karabiner-Elements 3 days ago
