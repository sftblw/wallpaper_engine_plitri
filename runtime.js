assert2(cr, 'cr namespace not created');
assert2(cr.plugins_, 'cr.plugins_ not created');

// temporary save initial values
window.wallpaperPropertyListenerC2 = {
  propList : [],
  valueList : {}
};
window.wallpaperPropertyListener = {
  applyUserPropertiesC2: null,
  applyUserProperties: function(properties) {
    var propList = window.wallpaperPropertyListenerC2.propList;
    var valueList = window.wallpaperPropertyListenerC2.valueList;
    
    if (window.wallpaperPropertyListener.applyUserPropertiesC2 !== null) {
      window.wallpaperPropertyListener.applyUserPropertiesC2(properties);
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

  // ///////////////////////////////////
  // Object type class
  pluginProto.Type = function (plugin) {
    this.plugin = plugin;
    this.runtime = plugin.runtime;
  };

  var typeProto = pluginProto.Type.prototype;

  // plugin variables
  var propList = window.wallpaperPropertyListenerC2.propList;
  var valueList = window.wallpaperPropertyListenerC2.valueList;
  var detailedPropList = [];
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

    var self = this;
    onlyOneInstance = this;

    // add listener of WallpaperEngine
    var aupc2_called = false;
    window.wallpaperPropertyListener.applyUserPropertiesC2 = function(properties) { 
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

  // called whenever an instance is created
  instanceProto.onCreate = function ()	{
    // note the object is sealed after this call; ensure any properties you'll ever need are set on the object
    // e.g...
    // this.myValue = 0;
  };

  // called whenever an instance is destroyed
  // note the runtime may keep the object after this call for recycling; be sure
  // to release/recycle/reset any references to other objects in this function.
  instanceProto.onDestroy = function ()	{
  };

  // called when saving the full state of the game
  instanceProto.saveToJSON = function ()	{
    // return a Javascript object containing information about your object's state
    // note you MUST use double-quote syntax (e.g. "property": value) to prevent
    // Closure Compiler renaming and breaking the save format
    return {
      // e.g.
      // "myValue": this.myValue
    };
  };

  // called when loading the full state of the game
  instanceProto.loadFromJSON = function (o)	{
    // load from the state previously saved by saveToJSON
    // 'o' provides the same object that you saved, e.g.
    // this.myValue = o["myValue"];
    // note you MUST use double-quote syntax (e.g. o["property"]) to prevent
    // Closure Compiler renaming and breaking the save format
  };

  // The comments around these functions ensure they are removed when exporting, since the
  // debugger code is no longer relevant after publishing.
  /** BEGIN-PREVIEWONLY**/
  instanceProto.getDebuggerValues = function (propsections)	{
    // Append to propsections any debugger sections you want to appear.
    // Each section is an object with two members: "title" and "properties".
    // "properties" is an array of individual debugger properties to display
    // with their name and value, and some other optional settings.
    // propsections.push({
    //   'title': 'My debugger section',
    //   'properties': [
    //     // Each property entry can use the following values:
    //     // "name" (required): name of the property (must be unique within this section)
    //     // "value" (required): a boolean, number or string for the value
    //     // "html" (optional, default false): set to true to interpret the name and value
    //     //									 as HTML strings rather than simple plain text
    //     // "readonly" (optional, default false): set to true to disable editing the property

    //     // Example:
    //     // {"name": "My property", "value": this.myValue}
    // ]
    // });
  };

  instanceProto.onDebugValueEdited = function (header, name, value)	{
    // Called when a non-readonly property has been edited in the debugger. Usually you only
    // will need 'name' (the property name) and 'value', but you can also use 'header' (the
    // header title for the section) to distinguish properties with the same name.
    // if (name === 'My property') {
    //   this.myProperty = value;
    // }
  };
  /** END-PREVIEWONLY**/

  // ////////////////////////////////////
  // Conditions
  function Cnds () {}

  // ### Conditions
  // - OnPropertyChanged (fn cndOnPropertyChanged)
  Cnds.prototype.cndOnPropertyChanged = function (propertyName)	{
    // return true if number is positive
    return propertyName === lastPropName;
  };

  pluginProto.cnds = new Cnds();

  // ////////////////////////////////////
  // Actions
  function Acts () {}

  // ### Actions
  // - Get Initial Properties (fn actGetInitialProperties)
  Acts.prototype.actGetInitialProperties = function ()	{
    // initialize prop
    propList = window.wallpaperPropertyListenerC2.propList;
    valueList = window.wallpaperPropertyListenerC2.valueList;

    for(var gg = 0; gg < propList.length; gg++) {
      lastPropName = propList[gg];
      onlyOneInstance.runtime.trigger(cr.plugins_.WallpaperEnginePlitri.prototype.cnds.cndOnPropertyChanged, onlyOneInstance);
    }
    // console.log("actSetProperty: " + name);
  };

  pluginProto.acts = new Acts();

  // ////////////////////////////////////
  // Expressions
  function Exps () {}

  // ### Expressions
  // - As Project JSON (fn AsProjectJSON)
  Exps.prototype.AsProjectJSON = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
  {
    ret.set_string("NOT IMPLEMENTED YET");
  };
  // - value (fn Value)
  Exps.prototype.Value = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
  {
    ret.set_string(valueList[lastPropName]);		// for ef_return_string
  };

  pluginProto.exps = new Exps();
}());
