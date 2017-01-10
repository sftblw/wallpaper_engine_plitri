// # Edittime script

// ## Project Information
function GetPluginSettings () {
  return {
    'name': 'WallpaperEngine',
    'id': 'WallpaperEnginePlitri',
    'version': '0.2',
    'description': 'unofficial WallpaperEngine HTML5 webpage plugin',
    'author': 'plitri',
    'help url': '(not yet documented)',
    'category': 'Platform specific',
    'type': 'object',
    'flags': 0 | pf_singleglobal
  };
}

// ## ACEs
// ### Conditions
// - OnPropertyChanged (fn cndOnPropertyChanged)
AddStringParam('Property name', 'Property name to listen (Should be valid JavaScript Identifier)', 'schemeColor');
AddCondition(0, cf_trigger,
  // wizard list name,    wizard category name
  'On property changed', 'Customization Property',
  // event sheet text,       description for when selected on event wizard
  'On property {0} changed', 'When property is changed, this condition triggers.',
  // runtime handler
  'cndOnPropertyChanged');

// ### Actions
AddAction(1, af_none,
  // wizard list name, wizard category name
  'Get initial properties', 'Customization Property',
  // event sheet text,   description for when selected on event wizard
  'Get initial properties and call OnPropertyChanged', 'Trigger all "On Property Changed" with initial property',
  // runtime handler
  'actGetInitialProperties');

// ### Expressions
// - Value (fn expValue)
AddExpression(1, ef_return_string,
  // wizard list name, wizard category name
  'value', 'value received at OnPropertyChanged',
  // expression function name,  description
  'Value', 'most recently gotten value (when OnPropertyChanged triggered) (string type)');

// ### ACE DONE
ACESDone();

// ## Plugin Properties
var property_list = [
];

// ## initializer, etc

// Called by IDE when a new object type is to be created
function CreateIDEObjectType () {
  return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType () {
  assert2(this instanceof arguments.callee, 'Constructor called as a function');
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function (instance) {
  return new IDEInstance(instance);
};

// Class representing an individual instance of an object in the IDE
function IDEInstance (instance, type) {
  assert2(this instanceof arguments.callee, 'Constructor called as a function');

  // Save the constructor parameters
  this.instance = instance;
  this.type = type;

  // Set the default property values from the property table
  this.properties = {};

  for (var i = 0; i < property_list.length; i++) {
    this.properties[property_list[i].name] = property_list[i].initial_value;
  }

  // Plugin-specific variables
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function () {};

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function () {};

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function (property_name) {};
