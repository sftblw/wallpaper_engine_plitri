// # runtime script

assert2(cr, 'cr namespace not created');
assert2(cr.plugins_, 'cr.plugins_ not created');

// save initial values, preserve on this
window.wallpaperProperties = {
  propList : [],
  valueList : {}
};

// wallpaperPropertyListener sould be accesed by [] for prevent renaming by Google closure compiler (minify & optimize).
window['wallpaperPropertyListener'] = {
  applyUserPropertiesC2: null, // handler for plugin internal.
  'applyUserProperties': function (properties) {
    var propList = window.wallpaperProperties.propList;
    var valueList = window.wallpaperProperties.valueList;
    
    if (window['wallpaperPropertyListener'].applyUserPropertiesC2 !== null) {
      window['wallpaperPropertyListener'].applyUserPropertiesC2(properties);
    }

    // iterate all prop
    for (var propname in properties) {
      if (!properties.hasOwnProperty(propname)) continue;
      propList.push(propname);
      valueList[propname] = properties[propname].value;
    }
  }
};

cr.plugins_.WallpaperEnginePlitri = function (runtime) {
  this.runtime = runtime;
};

(function () {
  var pluginProto = cr.plugins_.WallpaperEnginePlitri.prototype;

  // Object type class
  pluginProto.Type = function (plugin) {
    this.plugin = plugin;
    this.runtime = plugin.runtime;
  };

  var typeProto = pluginProto.Type.prototype;

  // plugin variables
  var propList = window.wallpaperProperties.propList;
  var valueList = window.wallpaperProperties.valueList;
  var lastPropName = '';
  var onlyOneInstance = null;

  // called on startup for each object type
  typeProto.onCreate = function ()	{
  };

  // ///////////////////////////////////
  // Instance class
  pluginProto.Instance = function (type)	{
    this.type = type;
    this.runtime = type.runtime;

    onlyOneInstance = this;

    // add listener of WallpaperEngine
    var aupc2_called = false;
    window['wallpaperPropertyListener'].applyUserPropertiesC2 = function(properties) { 
      // iterate all prop
      for(var gg = 0; gg < propList.length; gg++) {
        
        // found property change
        if (properties[propList[gg]]) {
          valueList[propList[gg]] = properties[propList[gg]].value;
          lastPropName = propList[gg];
          onlyOneInstance.runtime.trigger(cr.plugins_.WallpaperEnginePlitri.prototype.cnds.cndOnPropertyChanged, onlyOneInstance);
        }
      }
    };

  };

  var instanceProto = pluginProto.Instance.prototype;

  instanceProto.onCreate = function ()	{
  };

  instanceProto.onDestroy = function ()	{
  };

  // TODO: support save, load
  instanceProto.saveToJSON = function ()	{
    return {
    };
  };
  instanceProto.loadFromJSON = function (o)	{
  };

  /**BEGIN-PREVIEWONLY**/ // for export-time removal
  instanceProto.getDebuggerValues = function (propsections)	{
  };
  instanceProto.onDebugValueEdited = function (header, name, value)	{
  };
  /**END-PREVIEWONLY**/ // for export-time removal

  // ### Conditions
  function Cnds () {
  }

  // - OnPropertyChanged (fn cndOnPropertyChanged)
  Cnds.prototype.cndOnPropertyChanged = function (propertyName)	{
    // return true if number is positive
    return propertyName === lastPropName;
  };

  pluginProto.cnds = new Cnds();

  // ### Actions
  function Acts () {}

  // - Get Initial Properties (fn actGetInitialProperties)
  Acts.prototype.actGetInitialProperties = function ()	{
    // initialize prop
    propList = window.wallpaperProperties.propList;
    valueList = window.wallpaperProperties.valueList;

    for(var gg = 0; gg < propList.length; gg++) {
      lastPropName = propList[gg];
      onlyOneInstance.runtime.trigger(cr.plugins_.WallpaperEnginePlitri.prototype.cnds.cndOnPropertyChanged, onlyOneInstance);
    }
    // console.log("actSetProperty: " + name);
  };

  pluginProto.acts = new Acts();

  // ### Expressions
  function Exps () {}

  // - value (fn Value)
  Exps.prototype.Value = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
  {
    ret.set_string(valueList[lastPropName].toString());		// for ef_return_string
  };

  pluginProto.exps = new Exps();
}());
