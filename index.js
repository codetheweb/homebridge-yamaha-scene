const YamahaAPI = require("yamaha-nodejs");

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory("homebridge-yamaha-scene", "YamahaScene", YamahaScene);
}

function YamahaScene(log, config) {
  this.log = log;
  this.name = config.name;
  this.volume = config.volume || -30;
  this.initialScene = config.initial_scene || 1;
  this.yamaha = new YamahaAPI(config.ip);

  this._service = new Service.Switch(this.name);
  this._service.getCharacteristic(Characteristic.On).on('set', this._set.bind(this));
  this._service.getCharacteristic(Characteristic.On).on('get', this._get.bind(this));
}

YamahaScene.prototype.getServices = function() {
  return [this._service];
}

YamahaScene.prototype._get = function(callback) {
  this.yamaha.isOn().then(function(result) {
    callback(null, result);
  });
}

YamahaScene.prototype._set = function(on, callback) {
  if (on) {
    var that = this;
    this.yamaha.powerOn().then(function() {
      that.yamaha.SendXMLToReceiver('<YAMAHA_AV cmd="PUT"><Main_Zone><Scene><Scene_Load>Scene ' + that.initialScene + '</Scene_Load></Scene></Main_Zone></YAMAHA_AV>').then(function() {
        that.yamaha.setVolumeTo(that.volume * 10, 'Main_Zone').then(function() {
          callback(null, true);
        });
      });

    });
  }
  else {
    this.yamaha.powerOff().then(function() {
      callback(null, false);
    });
  }
}
