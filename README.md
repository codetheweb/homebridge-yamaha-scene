homebridge-yamaha-scene
========================

Turns on and off a Yamaha AV receiver and sets it to a default scene and volume.
Used to automate our home entertainment setup.

# Installation
`npm install -g homebridge-yamaha-scene`

# Example config.json

```javascript
    {
      "accessory": "YamahaScene",
      "name": "Yamaha AV",
      "ip": "xxx.yyy.0.zzz",
      "initial_scene": 1,
      "volume": -20
    }
```
