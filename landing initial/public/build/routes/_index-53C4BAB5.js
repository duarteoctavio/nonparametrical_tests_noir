import {
  require_jsx_runtime
} from "/build/_shared/chunk-Y6RJRNBS.js";
import {
  Link
} from "/build/_shared/chunk-ITVIPQFO.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-F4KNNEUR.js";
import "/build/_shared/chunk-PLT55Z5M.js";
import {
  require_react
} from "/build/_shared/chunk-2Z2JGDFU.js";
import {
  createHotContext
} from "/build/_shared/chunk-3ZICM4BA.js";
import "/build/_shared/chunk-JR22VO6P.js";
import {
  __require,
  __toESM
} from "/build/_shared/chunk-PZDJHGND.js";

// app/components/ui/button.tsx
var React = __toESM(require_react(), 1);

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else
      for (f in e)
        e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++)
    (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}

// node_modules/class-variance-authority/dist/index.mjs
var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
var cx = clsx;
var cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null)
    return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null)
      return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};

// node_modules/tailwind-merge/dist/bundle-mjs.mjs
var CLASS_PART_SEPARATOR = "-";
var createClassGroupUtils = (config) => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = (className) => {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === "" && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
var getGroupRecursive = (classParts, classPartObject) => {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({
    validator
  }) => validator(classRest))?.classGroupId;
};
var arbitraryPropertyRegex = /^\[(.+)\]$/;
var getGroupIdForArbitraryProperty = (className) => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property) {
      return "arbitrary.." + property;
    }
  }
};
var createClassMap = (config) => {
  const {
    theme,
    prefix
  } = config;
  const classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  classGroup.forEach((classDefinition) => {
    if (typeof classDefinition === "string") {
      const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup2]) => {
      processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
    });
  });
};
var getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
};
var isThemeGetter = (func) => func.isThemeGetter;
var getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map((classDefinition) => {
      if (typeof classDefinition === "string") {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === "object") {
        return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
};
var createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ new Map();
  let previousCache = /* @__PURE__ */ new Map();
  const update = (key, value) => {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ new Map();
    }
  };
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache.get(key)) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
};
var IMPORTANT_MODIFIER = "!";
var createParseClassName = (config) => {
  const {
    separator,
    experimentalParseClassName
  } = config;
  const isSeparatorSingleCharacter = separator.length === 1;
  const firstSeparatorCharacter = separator[0];
  const separatorLength = separator.length;
  const parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") {
        bracketDepth++;
      } else if (currentCharacter === "]") {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
  if (experimentalParseClassName) {
    return (className) => experimentalParseClassName({
      className,
      parseClassName
    });
  }
  return parseClassName;
};
var sortModifiers = (modifiers) => {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach((modifier) => {
    const isArbitraryVariant = modifier[0] === "[";
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
};
var createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  ...createClassGroupUtils(config)
});
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds
  } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.includes(classId)) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
function twJoin() {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
var toValue = (mix3) => {
  if (typeof mix3 === "string") {
    return mix3;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix3.length; k++) {
    if (mix3[k]) {
      if (resolvedValue = toValue(mix3[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
var fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
var fractionRegex = /^\d+\/\d+$/;
var stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isLength = (value) => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, "length", isLengthOnly);
var isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value));
var isArbitraryNumber = (value) => getIsArbitraryValue(value, "number", isNumber);
var isInteger = (value) => Boolean(value) && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
var isArbitrarySize = (value) => getIsArbitraryValue(value, sizeLabels, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, "position", isNever);
var imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
var isArbitraryImage = (value) => getIsArbitraryValue(value, imageLabels, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, "", isShadow);
var isAny = () => true;
var getIsArbitraryValue = (value, label, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return typeof label === "string" ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
var isLengthOnly = (value) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var getDefaultConfig = () => {
  const colors = fromTheme("colors");
  const spacing = fromTheme("spacing");
  const blur = fromTheme("blur");
  const brightness = fromTheme("brightness");
  const borderColor = fromTheme("borderColor");
  const borderRadius = fromTheme("borderRadius");
  const borderSpacing = fromTheme("borderSpacing");
  const borderWidth = fromTheme("borderWidth");
  const contrast = fromTheme("contrast");
  const grayscale = fromTheme("grayscale");
  const hueRotate = fromTheme("hueRotate");
  const invert = fromTheme("invert");
  const gap = fromTheme("gap");
  const gradientColorStops = fromTheme("gradientColorStops");
  const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
  const inset = fromTheme("inset");
  const margin = fromTheme("margin");
  const opacity = fromTheme("opacity");
  const padding = fromTheme("padding");
  const saturate = fromTheme("saturate");
  const scale3 = fromTheme("scale");
  const sepia = fromTheme("sepia");
  const skew = fromTheme("skew");
  const space = fromTheme("space");
  const translate = fromTheme("translate");
  const getOverscroll = () => ["auto", "contain", "none"];
  const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing];
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
  const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
  const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
  const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
  const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
  const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
  const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ["none", "", isTshirtSize, isArbitraryValue],
      brightness: getNumberAndArbitrary(),
      borderColor: [colors],
      borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumberAndArbitrary(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumberAndArbitrary(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumberAndArbitrary(),
      scale: getNumberAndArbitrary(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...getPositions(), isArbitraryValue]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", isInteger, isArbitraryValue]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", isInteger, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...getAlign()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...getAlign(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...getAlign(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [isArbitraryValue, spacing, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [isArbitraryValue, spacing, "none", "full", "min", "max", "fit", "prose", {
          screen: [isTshirtSize]
        }, isTshirtSize]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...getLineStyles(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", isLength, isArbitraryLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", isLength, isArbitraryValue]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...getPositions(), isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...getLineStyles(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [borderColor]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [borderColor]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...getLineStyles()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isLength, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [isLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: getLengthWithEmptyAndArbitrary()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [isLength, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...getBlendModes(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale3]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [scale3]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [scale3]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
};
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);

// app/lib/utils.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/lib/utils.ts"
  );
  import.meta.hot.lastModified = "1745710962110.9028";
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// app/components/ui/button.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id5) => {
    window.$RefreshRuntime$.register(type, '"app/components/ui/button.tsx"' + id5);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/ui/button.tsx"
  );
  import.meta.hot.lastModified = "1745707951796.0295";
}
var buttonVariants = cva("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300", {
  variants: {
    variant: {
      default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
      destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
      outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
      ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
      link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50"
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
var Button = React.forwardRef(_c = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}, ref) => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: cn(buttonVariants({
    variant,
    size,
    className
  })), ref, ...props }, void 0, false, {
    fileName: "app/components/ui/button.tsx",
    lineNumber: 53,
    columnNumber: 10
  }, this);
});
_c2 = Button;
Button.displayName = "Button";
var _c;
var _c2;
$RefreshReg$(_c, "Button$React.forwardRef");
$RefreshReg$(_c2, "Button");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/ui/card.tsx
var React2 = __toESM(require_react(), 1);
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id5) => {
    window.$RefreshRuntime$.register(type, '"app/components/ui/card.tsx"' + id5);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/ui/card.tsx"
  );
  import.meta.hot.lastModified = "1745707970810.0432";
}
var Card = React2.forwardRef(_c3 = ({
  className,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { ref, className: cn("rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50", className), ...props }, void 0, false, {
  fileName: "app/components/ui/card.tsx",
  lineNumber: 26,
  columnNumber: 12
}, this));
_c22 = Card;
Card.displayName = "Card";
var CardHeader = React2.forwardRef(_c32 = ({
  className,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props }, void 0, false, {
  fileName: "app/components/ui/card.tsx",
  lineNumber: 32,
  columnNumber: 12
}, this));
_c4 = CardHeader;
CardHeader.displayName = "CardHeader";
var CardTitle = React2.forwardRef(_c5 = ({
  className,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h3", { ref, className: cn("text-2xl font-semibold leading-none tracking-tight", className), ...props }, void 0, false, {
  fileName: "app/components/ui/card.tsx",
  lineNumber: 38,
  columnNumber: 12
}, this));
_c6 = CardTitle;
CardTitle.displayName = "CardTitle";
var CardDescription = React2.forwardRef(_c7 = ({
  className,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { ref, className: cn("text-sm text-slate-500 dark:text-slate-400", className), ...props }, void 0, false, {
  fileName: "app/components/ui/card.tsx",
  lineNumber: 44,
  columnNumber: 12
}, this));
_c8 = CardDescription;
CardDescription.displayName = "CardDescription";
var CardContent = React2.forwardRef(_c9 = ({
  className,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { ref, className: cn("p-6 pt-0", className), ...props }, void 0, false, {
  fileName: "app/components/ui/card.tsx",
  lineNumber: 50,
  columnNumber: 12
}, this));
_c10 = CardContent;
CardContent.displayName = "CardContent";
var CardFooter = React2.forwardRef(_c11 = ({
  className,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props }, void 0, false, {
  fileName: "app/components/ui/card.tsx",
  lineNumber: 56,
  columnNumber: 12
}, this));
_c12 = CardFooter;
CardFooter.displayName = "CardFooter";
var _c3;
var _c22;
var _c32;
var _c4;
var _c5;
var _c6;
var _c7;
var _c8;
var _c9;
var _c10;
var _c11;
var _c12;
$RefreshReg$(_c3, "Card$React.forwardRef");
$RefreshReg$(_c22, "Card");
$RefreshReg$(_c32, "CardHeader$React.forwardRef");
$RefreshReg$(_c4, "CardHeader");
$RefreshReg$(_c5, "CardTitle$React.forwardRef");
$RefreshReg$(_c6, "CardTitle");
$RefreshReg$(_c7, "CardDescription$React.forwardRef");
$RefreshReg$(_c8, "CardDescription");
$RefreshReg$(_c9, "CardContent$React.forwardRef");
$RefreshReg$(_c10, "CardContent");
$RefreshReg$(_c11, "CardFooter$React.forwardRef");
$RefreshReg$(_c12, "CardFooter");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/ui/separator.tsx
var React3 = __toESM(require_react(), 1);
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id5) => {
    window.$RefreshRuntime$.register(type, '"app/components/ui/separator.tsx"' + id5);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/ui/separator.tsx"
  );
  import.meta.hot.lastModified = "1745707979784.3774";
}
var Separator = React3.forwardRef(_c13 = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { ref, className: cn("shrink-0 bg-slate-200 dark:bg-slate-800", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className), ...props, role: decorative ? "none" : "separator", "aria-orientation": decorative ? void 0 : orientation }, void 0, false, {
  fileName: "app/components/ui/separator.tsx",
  lineNumber: 28,
  columnNumber: 12
}, this));
_c23 = Separator;
Separator.displayName = "Separator";
var _c13;
var _c23;
$RefreshReg$(_c13, "Separator$React.forwardRef");
$RefreshReg$(_c23, "Separator");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var import_react = __toESM(require_react());

// node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().trim();
var createLucideIcon = (iconName, iconNode) => {
  const Component3 = (0, import_react.forwardRef)(
    ({
      color: color3 = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      ...rest
    }, ref) => {
      return (0, import_react.createElement)(
        "svg",
        {
          ref,
          ...defaultAttributes,
          width: size,
          height: size,
          stroke: color3,
          strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
          className: ["lucide", `lucide-${toKebabCase(iconName)}`, className].join(" "),
          ...rest
        },
        [
          ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
          ...Array.isArray(children) ? children : [children]
        ]
      );
    }
  );
  Component3.displayName = `${iconName}`;
  return Component3;
};

// node_modules/lucide-react/dist/esm/icons/arrow-right.js
var ArrowRight = createLucideIcon("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);

// node_modules/lucide-react/dist/esm/icons/bar-chart-3.js
var BarChart3 = createLucideIcon("BarChart3", [
  ["path", { d: "M3 3v18h18", key: "1s2lah" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
]);

// node_modules/lucide-react/dist/esm/icons/check-circle.js
var CheckCircle = createLucideIcon("CheckCircle", [
  ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);

// node_modules/lucide-react/dist/esm/icons/clock.js
var Clock = createLucideIcon("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);

// node_modules/lucide-react/dist/esm/icons/file-check.js
var FileCheck = createLucideIcon("FileCheck", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "m9 15 2 2 4-4", key: "1grp1n" }]
]);

// node_modules/lucide-react/dist/esm/icons/search.js
var Search = createLucideIcon("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);

// node_modules/lucide-react/dist/esm/icons/shield.js
var Shield = createLucideIcon("Shield", [
  ["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10", key: "1irkt0" }]
]);

// node_modules/lucide-react/dist/esm/icons/star.js
var Star = createLucideIcon("Star", [
  [
    "polygon",
    {
      points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
      key: "8f66p6"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/trophy.js
var Trophy = createLucideIcon("Trophy", [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
]);

// node_modules/lucide-react/dist/esm/icons/users.js
var Users = createLucideIcon("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]);

// node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs
var import_react2 = __toESM(require_react(), 1);
"use client";
var LayoutGroupContext = (0, import_react2.createContext)({});

// node_modules/framer-motion/dist/es/utils/use-constant.mjs
var import_react3 = __toESM(require_react(), 1);
function useConstant(init) {
  const ref = (0, import_react3.useRef)(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}

// node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var import_react4 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/utils/is-browser.mjs
var isBrowser = typeof window !== "undefined";

// node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var useIsomorphicLayoutEffect = isBrowser ? import_react4.useLayoutEffect : import_react4.useEffect;

// node_modules/framer-motion/dist/es/context/PresenceContext.mjs
var import_react5 = __toESM(require_react(), 1);
"use client";
var PresenceContext = /* @__PURE__ */ (0, import_react5.createContext)(null);

// node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs
var import_react6 = __toESM(require_react(), 1);
"use client";
var MotionConfigContext = (0, import_react6.createContext)({
  transformPagePoint: (p) => p,
  isStatic: false,
  reducedMotion: "never"
});

// node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
var import_react7 = __toESM(require_react(), 1);
function usePresence(subscribe = true) {
  const context = (0, import_react7.useContext)(PresenceContext);
  if (context === null)
    return [true, null];
  const { isPresent, onExitComplete, register } = context;
  const id5 = (0, import_react7.useId)();
  (0, import_react7.useEffect)(() => {
    if (subscribe) {
      return register(id5);
    }
  }, [subscribe]);
  const safeToRemove = (0, import_react7.useCallback)(() => subscribe && onExitComplete && onExitComplete(id5), [id5, onExitComplete, subscribe]);
  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}

// node_modules/motion-utils/dist/es/array.mjs
function addUniqueItem(arr, item) {
  if (arr.indexOf(item) === -1)
    arr.push(item);
}
function removeItem(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1)
    arr.splice(index, 1);
}

// node_modules/motion-utils/dist/es/clamp.mjs
var clamp = (min, max, v) => {
  if (v > max)
    return max;
  if (v < min)
    return min;
  return v;
};

// node_modules/motion-utils/dist/es/errors.mjs
var warning = () => {
};
var invariant = () => {
};
if (true) {
  warning = (check, message) => {
    if (!check && typeof console !== "undefined") {
      console.warn(message);
    }
  };
  invariant = (check, message) => {
    if (!check) {
      throw new Error(message);
    }
  };
}

// node_modules/motion-utils/dist/es/global-config.mjs
var MotionGlobalConfig = {};

// node_modules/motion-utils/dist/es/is-numerical-string.mjs
var isNumericalString = (v) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);

// node_modules/motion-utils/dist/es/is-zero-value-string.mjs
var isZeroValueString = (v) => /^0[^.\s]+$/u.test(v);

// node_modules/motion-utils/dist/es/memo.mjs
function memo(callback) {
  let result;
  return () => {
    if (result === void 0)
      result = callback();
    return result;
  };
}

// node_modules/motion-utils/dist/es/noop.mjs
var noop = (any) => any;

// node_modules/motion-utils/dist/es/pipe.mjs
var combineFunctions = (a, b) => (v) => b(a(v));
var pipe = (...transformers) => transformers.reduce(combineFunctions);

// node_modules/motion-utils/dist/es/progress.mjs
var progress = (from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

// node_modules/motion-utils/dist/es/subscription-manager.mjs
var SubscriptionManager = class {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    addUniqueItem(this.subscriptions, handler);
    return () => removeItem(this.subscriptions, handler);
  }
  notify(a, b, c) {
    const numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a, b, c);
    } else {
      for (let i = 0; i < numSubscriptions; i++) {
        const handler = this.subscriptions[i];
        handler && handler(a, b, c);
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
};

// node_modules/motion-utils/dist/es/time-conversion.mjs
var secondsToMilliseconds = (seconds) => seconds * 1e3;
var millisecondsToSeconds = (milliseconds) => milliseconds / 1e3;

// node_modules/motion-utils/dist/es/velocity-per-second.mjs
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}

// node_modules/motion-utils/dist/es/warn-once.mjs
var warned = /* @__PURE__ */ new Set();
function warnOnce(condition, message, element) {
  if (condition || warned.has(message))
    return;
  console.warn(message);
  if (element)
    console.warn(element);
  warned.add(message);
}

// node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs
var calcBezier = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
var subdivisionPrecision = 1e-7;
var subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noop;
  const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
  return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}

// node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs
var mirrorEasing = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;

// node_modules/motion-utils/dist/es/easing/modifiers/reverse.mjs
var reverseEasing = (easing) => (p) => 1 - easing(1 - p);

// node_modules/motion-utils/dist/es/easing/back.mjs
var backOut = /* @__PURE__ */ cubicBezier(0.33, 1.53, 0.69, 0.99);
var backIn = /* @__PURE__ */ reverseEasing(backOut);
var backInOut = /* @__PURE__ */ mirrorEasing(backIn);

// node_modules/motion-utils/dist/es/easing/anticipate.mjs
var anticipate = (p) => (p *= 2) < 1 ? 0.5 * backIn(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));

// node_modules/motion-utils/dist/es/easing/circ.mjs
var circIn = (p) => 1 - Math.sin(Math.acos(p));
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circIn);

// node_modules/motion-utils/dist/es/easing/ease.mjs
var easeIn = /* @__PURE__ */ cubicBezier(0.42, 0, 1, 1);
var easeOut = /* @__PURE__ */ cubicBezier(0, 0, 0.58, 1);
var easeInOut = /* @__PURE__ */ cubicBezier(0.42, 0, 0.58, 1);

// node_modules/motion-utils/dist/es/easing/utils/is-easing-array.mjs
var isEasingArray = (ease3) => {
  return Array.isArray(ease3) && typeof ease3[0] !== "number";
};

// node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs
var isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";

// node_modules/motion-utils/dist/es/easing/utils/map.mjs
var easingLookup = {
  linear: noop,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate
};
var isValidEasing = (easing) => {
  return typeof easing === "string";
};
var easingDefinitionToFunction = (definition) => {
  if (isBezierDefinition(definition)) {
    invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`);
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (isValidEasing(definition)) {
    invariant(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`);
    return easingLookup[definition];
  }
  return definition;
};

// node_modules/motion-dom/dist/es/frameloop/order.mjs
var stepsOrder = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];

// node_modules/motion-dom/dist/es/stats/buffer.mjs
var statsBuffer = {
  value: null,
  addProjectionMetrics: null
};

// node_modules/motion-dom/dist/es/frameloop/render-step.mjs
function createRenderStep(runNextFrame, stepName) {
  let thisFrame = /* @__PURE__ */ new Set();
  let nextFrame = /* @__PURE__ */ new Set();
  let isProcessing = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  let latestFrameData = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  let numCalls = 0;
  function triggerCallback(callback) {
    if (toKeepAlive.has(callback)) {
      step.schedule(callback);
      runNextFrame();
    }
    numCalls++;
    callback(latestFrameData);
  }
  const step = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing;
      const queue = addToCurrentFrame ? thisFrame : nextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (!queue.has(callback))
        queue.add(callback);
      return callback;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (callback) => {
      nextFrame.delete(callback);
      toKeepAlive.delete(callback);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (frameData3) => {
      latestFrameData = frameData3;
      if (isProcessing) {
        flushNextFrame = true;
        return;
      }
      isProcessing = true;
      [thisFrame, nextFrame] = [nextFrame, thisFrame];
      thisFrame.forEach(triggerCallback);
      if (stepName && statsBuffer.value) {
        statsBuffer.value.frameloop[stepName].push(numCalls);
      }
      numCalls = 0;
      thisFrame.clear();
      isProcessing = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData3);
      }
    }
  };
  return step;
}

// node_modules/motion-dom/dist/es/frameloop/batcher.mjs
var maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
  let runNextFrame = false;
  let useDefaultElapsed = true;
  const state = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  const flagRunNextFrame = () => runNextFrame = true;
  const steps = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(flagRunNextFrame, allowKeepAlive ? key : void 0);
    return acc;
  }, {});
  const { setup, read, resolveKeyframes, preUpdate, update, preRender, render, postRender } = steps;
  const processBatch = () => {
    const timestamp = MotionGlobalConfig.useManualTiming ? state.timestamp : performance.now();
    runNextFrame = false;
    if (!MotionGlobalConfig.useManualTiming) {
      state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
    }
    state.timestamp = timestamp;
    state.isProcessing = true;
    setup.process(state);
    read.process(state);
    resolveKeyframes.process(state);
    preUpdate.process(state);
    update.process(state);
    preRender.process(state);
    render.process(state);
    postRender.process(state);
    state.isProcessing = false;
    if (runNextFrame && allowKeepAlive) {
      useDefaultElapsed = false;
      scheduleNextBatch(processBatch);
    }
  };
  const wake = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!state.isProcessing) {
      scheduleNextBatch(processBatch);
    }
  };
  const schedule = stepsOrder.reduce((acc, key) => {
    const step = steps[key];
    acc[key] = (process2, keepAlive = false, immediate = false) => {
      if (!runNextFrame)
        wake();
      return step.schedule(process2, keepAlive, immediate);
    };
    return acc;
  }, {});
  const cancel = (process2) => {
    for (let i = 0; i < stepsOrder.length; i++) {
      steps[stepsOrder[i]].cancel(process2);
    }
  };
  return { schedule, cancel, state, steps };
}

// node_modules/motion-dom/dist/es/frameloop/frame.mjs
var { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = /* @__PURE__ */ createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);

// node_modules/motion-dom/dist/es/frameloop/sync-time.mjs
var now;
function clearTime() {
  now = void 0;
}
var time = {
  now: () => {
    if (now === void 0) {
      time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now());
    }
    return now;
  },
  set: (newTime) => {
    now = newTime;
    queueMicrotask(clearTime);
  }
};

// node_modules/motion-dom/dist/es/stats/animation-count.mjs
var activeAnimations = {
  layout: 0,
  mainThread: 0,
  waapi: 0
};

// node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs
var checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
var isCSSVariableName = /* @__PURE__ */ checkStringStartsWith("--");
var startsAsVariableToken = /* @__PURE__ */ checkStringStartsWith("var(--");
var isCSSVariableToken = (value) => {
  const startsWithToken = startsAsVariableToken(value);
  if (!startsWithToken)
    return false;
  return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
var singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;

// node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
var number = {
  test: (v) => typeof v === "number",
  parse: parseFloat,
  transform: (v) => v
};
var alpha = {
  ...number,
  transform: (v) => clamp(0, 1, v)
};
var scale = {
  ...number,
  default: 1
};

// node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs
var sanitize = (v) => Math.round(v * 1e5) / 1e5;

// node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs
var floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;

// node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs
function isNullish(v) {
  return v == null;
}

// node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
var singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;

// node_modules/motion-dom/dist/es/value/types/color/utils.mjs
var isColorString = (type, testProp) => (v) => {
  return Boolean(typeof v === "string" && singleColorRegex.test(v) && v.startsWith(type) || testProp && !isNullish(v) && Object.prototype.hasOwnProperty.call(v, testProp));
};
var splitColor = (aName, bName, cName) => (v) => {
  if (typeof v !== "string")
    return v;
  const [a, b, c, alpha3] = v.match(floatRegex);
  return {
    [aName]: parseFloat(a),
    [bName]: parseFloat(b),
    [cName]: parseFloat(c),
    alpha: alpha3 !== void 0 ? parseFloat(alpha3) : 1
  };
};

// node_modules/motion-dom/dist/es/value/types/color/rgba.mjs
var clampRgbUnit = (v) => clamp(0, 255, v);
var rgbUnit = {
  ...number,
  transform: (v) => Math.round(clampRgbUnit(v))
};
var rgba = {
  test: /* @__PURE__ */ isColorString("rgb", "red"),
  parse: /* @__PURE__ */ splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};

// node_modules/motion-dom/dist/es/value/types/color/hex.mjs
function parseHex(v) {
  let r2 = "";
  let g = "";
  let b = "";
  let a = "";
  if (v.length > 5) {
    r2 = v.substring(1, 3);
    g = v.substring(3, 5);
    b = v.substring(5, 7);
    a = v.substring(7, 9);
  } else {
    r2 = v.substring(1, 2);
    g = v.substring(2, 3);
    b = v.substring(3, 4);
    a = v.substring(4, 5);
    r2 += r2;
    g += g;
    b += b;
    a += a;
  }
  return {
    red: parseInt(r2, 16),
    green: parseInt(g, 16),
    blue: parseInt(b, 16),
    alpha: a ? parseInt(a, 16) / 255 : 1
  };
}
var hex = {
  test: /* @__PURE__ */ isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};

// node_modules/motion-dom/dist/es/value/types/numbers/units.mjs
var createUnitType = (unit) => ({
  test: (v) => typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
  parse: parseFloat,
  transform: (v) => `${v}${unit}`
});
var degrees = /* @__PURE__ */ createUnitType("deg");
var percent = /* @__PURE__ */ createUnitType("%");
var px = /* @__PURE__ */ createUnitType("px");
var vh = /* @__PURE__ */ createUnitType("vh");
var vw = /* @__PURE__ */ createUnitType("vw");
var progressPercentage = /* @__PURE__ */ (() => ({
  ...percent,
  parse: (v) => percent.parse(v) / 100,
  transform: (v) => percent.transform(v * 100)
}))();

// node_modules/motion-dom/dist/es/value/types/color/hsla.mjs
var hsla = {
  test: /* @__PURE__ */ isColorString("hsl", "hue"),
  parse: /* @__PURE__ */ splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};

// node_modules/motion-dom/dist/es/value/types/color/index.mjs
var color = {
  test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
  parse: (v) => {
    if (rgba.test(v)) {
      return rgba.parse(v);
    } else if (hsla.test(v)) {
      return hsla.parse(v);
    } else {
      return hex.parse(v);
    }
  },
  transform: (v) => {
    return typeof v === "string" ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
  }
};

// node_modules/motion-dom/dist/es/value/types/utils/color-regex.mjs
var colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;

// node_modules/motion-dom/dist/es/value/types/complex/index.mjs
function test(v) {
  return isNaN(v) && typeof v === "string" && (v.match(floatRegex)?.length || 0) + (v.match(colorRegex)?.length || 0) > 0;
}
var NUMBER_TOKEN = "number";
var COLOR_TOKEN = "color";
var VAR_TOKEN = "var";
var VAR_FUNCTION_TOKEN = "var(";
var SPLIT_TOKEN = "${}";
var complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
  const originalValue = value.toString();
  const values = [];
  const indexes = {
    color: [],
    number: [],
    var: []
  };
  const types = [];
  let i = 0;
  const tokenised = originalValue.replace(complexRegex, (parsedValue) => {
    if (color.test(parsedValue)) {
      indexes.color.push(i);
      types.push(COLOR_TOKEN);
      values.push(color.parse(parsedValue));
    } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
      indexes.var.push(i);
      types.push(VAR_TOKEN);
      values.push(parsedValue);
    } else {
      indexes.number.push(i);
      types.push(NUMBER_TOKEN);
      values.push(parseFloat(parsedValue));
    }
    ++i;
    return SPLIT_TOKEN;
  });
  const split = tokenised.split(SPLIT_TOKEN);
  return { values, split, indexes, types };
}
function parseComplexValue(v) {
  return analyseComplexValue(v).values;
}
function createTransformer(source) {
  const { split, types } = analyseComplexValue(source);
  const numSections = split.length;
  return (v) => {
    let output = "";
    for (let i = 0; i < numSections; i++) {
      output += split[i];
      if (v[i] !== void 0) {
        const type = types[i];
        if (type === NUMBER_TOKEN) {
          output += sanitize(v[i]);
        } else if (type === COLOR_TOKEN) {
          output += color.transform(v[i]);
        } else {
          output += v[i];
        }
      }
    }
    return output;
  };
}
var convertNumbersToZero = (v) => typeof v === "number" ? 0 : v;
function getAnimatableNone(v) {
  const parsed = parseComplexValue(v);
  const transformer = createTransformer(v);
  return transformer(parsed.map(convertNumbersToZero));
}
var complex = {
  test,
  parse: parseComplexValue,
  createTransformer,
  getAnimatableNone
};

// node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
function hueToRgb(p, q, t) {
  if (t < 0)
    t += 1;
  if (t > 1)
    t -= 1;
  if (t < 1 / 6)
    return p + (q - p) * 6 * t;
  if (t < 1 / 2)
    return q;
  if (t < 2 / 3)
    return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha3 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    red = hueToRgb(p, q, hue + 1 / 3);
    green = hueToRgb(p, q, hue);
    blue = hueToRgb(p, q, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha3
  };
}

// node_modules/motion-dom/dist/es/utils/mix/immediate.mjs
function mixImmediate(a, b) {
  return (p) => p > 0 ? b : a;
}

// node_modules/motion-dom/dist/es/utils/mix/number.mjs
var mixNumber = (from, to, progress3) => {
  return from + (to - from) * progress3;
};

// node_modules/motion-dom/dist/es/utils/mix/color.mjs
var mixLinearColor = (from, to, v) => {
  const fromExpo = from * from;
  const expo = v * (to * to - fromExpo) + fromExpo;
  return expo < 0 ? 0 : Math.sqrt(expo);
};
var colorTypes = [hex, rgba, hsla];
var getColorType = (v) => colorTypes.find((type) => type.test(v));
function asRGBA(color3) {
  const type = getColorType(color3);
  warning(Boolean(type), `'${color3}' is not an animatable color. Use the equivalent color code instead.`);
  if (!Boolean(type))
    return false;
  let model = type.parse(color3);
  if (type === hsla) {
    model = hslaToRgba(model);
  }
  return model;
}
var mixColor = (from, to) => {
  const fromRGBA = asRGBA(from);
  const toRGBA = asRGBA(to);
  if (!fromRGBA || !toRGBA) {
    return mixImmediate(from, to);
  }
  const blended = { ...fromRGBA };
  return (v) => {
    blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
    blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
    blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
    blended.alpha = mixNumber(fromRGBA.alpha, toRGBA.alpha, v);
    return rgba.transform(blended);
  };
};

// node_modules/motion-dom/dist/es/utils/mix/visibility.mjs
var invisibleValues = /* @__PURE__ */ new Set(["none", "hidden"]);
function mixVisibility(origin, target) {
  if (invisibleValues.has(origin)) {
    return (p) => p <= 0 ? origin : target;
  } else {
    return (p) => p >= 1 ? target : origin;
  }
}

// node_modules/motion-dom/dist/es/utils/mix/complex.mjs
function mixNumber2(a, b) {
  return (p) => mixNumber(a, b, p);
}
function getMixer(a) {
  if (typeof a === "number") {
    return mixNumber2;
  } else if (typeof a === "string") {
    return isCSSVariableToken(a) ? mixImmediate : color.test(a) ? mixColor : mixComplex;
  } else if (Array.isArray(a)) {
    return mixArray;
  } else if (typeof a === "object") {
    return color.test(a) ? mixColor : mixObject;
  }
  return mixImmediate;
}
function mixArray(a, b) {
  const output = [...a];
  const numValues = output.length;
  const blendValue = a.map((v, i) => getMixer(v)(v, b[i]));
  return (p) => {
    for (let i = 0; i < numValues; i++) {
      output[i] = blendValue[i](p);
    }
    return output;
  };
}
function mixObject(a, b) {
  const output = { ...a, ...b };
  const blendValue = {};
  for (const key in output) {
    if (a[key] !== void 0 && b[key] !== void 0) {
      blendValue[key] = getMixer(a[key])(a[key], b[key]);
    }
  }
  return (v) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v);
    }
    return output;
  };
}
function matchOrder(origin, target) {
  const orderedOrigin = [];
  const pointers = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < target.values.length; i++) {
    const type = target.types[i];
    const originIndex = origin.indexes[type][pointers[type]];
    const originValue = origin.values[originIndex] ?? 0;
    orderedOrigin[i] = originValue;
    pointers[type]++;
  }
  return orderedOrigin;
}
var mixComplex = (origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyseComplexValue(origin);
  const targetStats = analyseComplexValue(target);
  const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
  if (canInterpolate) {
    if (invisibleValues.has(origin) && !targetStats.values.length || invisibleValues.has(target) && !originStats.values.length) {
      return mixVisibility(origin, target);
    }
    return pipe(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
  } else {
    warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
    return mixImmediate(origin, target);
  }
};

// node_modules/motion-dom/dist/es/utils/mix/index.mjs
function mix(from, to, p) {
  if (typeof from === "number" && typeof to === "number" && typeof p === "number") {
    return mixNumber(from, to, p);
  }
  const mixer = getMixer(from);
  return mixer(from, to);
}

// node_modules/motion-dom/dist/es/animation/drivers/driver-frameloop.mjs
var frameloopDriver = (update) => {
  const passTimestamp = ({ timestamp }) => update(timestamp);
  return {
    start: () => frame.update(passTimestamp, true),
    stop: () => cancelFrame(passTimestamp),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => frameData.isProcessing ? frameData.timestamp : time.now()
  };
};

// node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs
var generateLinearEasing = (easing, duration, resolution = 10) => {
  let points = "";
  const numPoints = Math.max(Math.round(duration / resolution), 2);
  for (let i = 0; i < numPoints; i++) {
    points += easing(i / (numPoints - 1)) + ", ";
  }
  return `linear(${points.substring(0, points.length - 2)})`;
};

// node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs
var maxGeneratorDuration = 2e4;
function calcGeneratorDuration(generator) {
  let duration = 0;
  const timeStep = 50;
  let state = generator.next(duration);
  while (!state.done && duration < maxGeneratorDuration) {
    duration += timeStep;
    state = generator.next(duration);
  }
  return duration >= maxGeneratorDuration ? Infinity : duration;
}

// node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function createGeneratorEasing(options, scale3 = 100, createGenerator) {
  const generator = createGenerator({ ...options, keyframes: [0, scale3] });
  const duration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
  return {
    type: "keyframes",
    ease: (progress3) => {
      return generator.next(duration * progress3).value / scale3;
    },
    duration: millisecondsToSeconds(duration)
  };
}

// node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var velocitySampleDuration = 5;
function calcGeneratorVelocity(resolveValue, t, current) {
  const prevT = Math.max(t - velocitySampleDuration, 0);
  return velocityPerSecond(current - resolveValue(prevT), t - prevT);
}

// node_modules/motion-dom/dist/es/animation/generators/spring/defaults.mjs
var springDefaults = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};

// node_modules/motion-dom/dist/es/animation/generators/spring/find.mjs
var safeMin = 1e-3;
function findSpring({ duration = springDefaults.duration, bounce = springDefaults.bounce, velocity = springDefaults.velocity, mass = springDefaults.mass }) {
  let envelope;
  let derivative;
  warning(duration <= secondsToMilliseconds(springDefaults.maxDuration), "Spring duration must be 10 seconds or less");
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio);
  duration = clamp(springDefaults.minDuration, springDefaults.maxDuration, millisecondsToSeconds(duration));
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a = exponentialDecay - velocity;
      const b = calcAngularFreq(undampedFreq2, dampingRatio);
      const c = Math.exp(-delta);
      return safeMin - a / b * c;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d = delta * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f = Math.exp(-delta);
      const g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a * b;
    };
    derivative = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (velocity - undampedFreq2) * (duration * duration);
      return a * b;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = secondsToMilliseconds(duration);
  if (isNaN(undampedFreq)) {
    return {
      stiffness: springDefaults.stiffness,
      damping: springDefaults.damping,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}

// node_modules/motion-dom/dist/es/animation/generators/spring/index.mjs
var durationKeys = ["duration", "bounce"];
var physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
  return keys.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
  let springOptions = {
    velocity: springDefaults.velocity,
    stiffness: springDefaults.stiffness,
    damping: springDefaults.damping,
    mass: springDefaults.mass,
    isResolvedFromDuration: false,
    ...options
  };
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    if (options.visualDuration) {
      const visualDuration = options.visualDuration;
      const root = 2 * Math.PI / (visualDuration * 1.2);
      const stiffness = root * root;
      const damping = 2 * clamp(0.05, 1, 1 - (options.bounce || 0)) * Math.sqrt(stiffness);
      springOptions = {
        ...springOptions,
        mass: springDefaults.mass,
        stiffness,
        damping
      };
    } else {
      const derived = findSpring(options);
      springOptions = {
        ...springOptions,
        ...derived,
        mass: springDefaults.mass
      };
      springOptions.isResolvedFromDuration = true;
    }
  }
  return springOptions;
}
function spring(optionsOrVisualDuration = springDefaults.visualDuration, bounce = springDefaults.bounce) {
  const options = typeof optionsOrVisualDuration !== "object" ? {
    visualDuration: optionsOrVisualDuration,
    keyframes: [0, 1],
    bounce
  } : optionsOrVisualDuration;
  let { restSpeed, restDelta } = options;
  const origin = options.keyframes[0];
  const target = options.keyframes[options.keyframes.length - 1];
  const state = { done: false, value: origin };
  const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
    ...options,
    velocity: -millisecondsToSeconds(options.velocity || 0)
  });
  const initialVelocity = velocity || 0;
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const initialDelta = target - origin;
  const undampedAngularFreq = millisecondsToSeconds(Math.sqrt(stiffness / mass));
  const isGranularScale = Math.abs(initialDelta) < 5;
  restSpeed || (restSpeed = isGranularScale ? springDefaults.restSpeed.granular : springDefaults.restSpeed.default);
  restDelta || (restDelta = isGranularScale ? springDefaults.restDelta.granular : springDefaults.restDelta.default);
  let resolveSpring;
  if (dampingRatio < 1) {
    const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
    };
  } else if (dampingRatio === 1) {
    resolveSpring = (t) => target - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
  } else {
    const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      const freqForT = Math.min(dampedAngularFreq * t, 300);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
    };
  }
  const generator = {
    calculatedDuration: isResolvedFromDuration ? duration || null : null,
    next: (t) => {
      const current = resolveSpring(t);
      if (!isResolvedFromDuration) {
        let currentVelocity = t === 0 ? initialVelocity : 0;
        if (dampingRatio < 1) {
          currentVelocity = t === 0 ? secondsToMilliseconds(initialVelocity) : calcGeneratorVelocity(resolveSpring, t, current);
        }
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t >= duration;
      }
      state.value = state.done ? target : current;
      return state;
    },
    toString: () => {
      const calculatedDuration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
      const easing = generateLinearEasing((progress3) => generator.next(calculatedDuration * progress3).value, calculatedDuration, 30);
      return calculatedDuration + "ms " + easing;
    },
    toTransition: () => {
    }
  };
  return generator;
}
spring.applyToOptions = (options) => {
  const generatorOptions = createGeneratorEasing(options, 100, spring);
  options.ease = generatorOptions.ease;
  options.duration = secondsToMilliseconds(generatorOptions.duration);
  options.type = "keyframes";
  return options;
};

// node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
function inertia({ keyframes: keyframes3, velocity = 0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
  const origin = keyframes3[0];
  const state = {
    done: false,
    value: origin
  };
  const isOutOfBounds = (v) => min !== void 0 && v < min || max !== void 0 && v > max;
  const nearestBoundary = (v) => {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  };
  let amplitude = power * velocity;
  const ideal = origin + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - origin;
  const calcDelta = (t) => -amplitude * Math.exp(-t / timeConstant);
  const calcLatest = (t) => target + calcDelta(t);
  const applyFriction = (t) => {
    const delta = calcDelta(t);
    const latest = calcLatest(t);
    state.done = Math.abs(delta) <= restDelta;
    state.value = state.done ? target : latest;
  };
  let timeReachedBoundary;
  let spring$1;
  const checkCatchBoundary = (t) => {
    if (!isOutOfBounds(state.value))
      return;
    timeReachedBoundary = t;
    spring$1 = spring({
      keyframes: [state.value, nearestBoundary(state.value)],
      velocity: calcGeneratorVelocity(calcLatest, t, state.value),
      // TODO: This should be passing * 1000
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDelta,
      restSpeed
    });
  };
  checkCatchBoundary(0);
  return {
    calculatedDuration: null,
    next: (t) => {
      let hasUpdatedFrame = false;
      if (!spring$1 && timeReachedBoundary === void 0) {
        hasUpdatedFrame = true;
        applyFriction(t);
        checkCatchBoundary(t);
      }
      if (timeReachedBoundary !== void 0 && t >= timeReachedBoundary) {
        return spring$1.next(t - timeReachedBoundary);
      } else {
        !hasUpdatedFrame && applyFriction(t);
        return state;
      }
    }
  };
}

// node_modules/motion-dom/dist/es/utils/interpolate.mjs
function createMixers(output, ease3, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || MotionGlobalConfig.mix || mix;
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease3) {
      const easingFunction = Array.isArray(ease3) ? ease3[i] || noop : ease3;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function interpolate(input, output, { clamp: isClamp = true, ease: ease3, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length, "Both input and output ranges must be the same length");
  if (inputLength === 1)
    return () => output[0];
  if (inputLength === 2 && output[0] === output[1])
    return () => output[1];
  const isZeroDeltaRange = input[0] === input[1];
  if (input[0] > input[inputLength - 1]) {
    input = [...input].reverse();
    output = [...output].reverse();
  }
  const mixers = createMixers(output, ease3, mixer);
  const numMixers = mixers.length;
  const interpolator = (v) => {
    if (isZeroDeltaRange && v < input[0])
      return output[0];
    let i = 0;
    if (numMixers > 1) {
      for (; i < input.length - 2; i++) {
        if (v < input[i + 1])
          break;
      }
    }
    const progressInRange = progress(input[i], input[i + 1], v);
    return mixers[i](progressInRange);
  };
  return isClamp ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}

// node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = progress(0, remaining, i);
    offset.push(mixNumber(min, 1, offsetProgress));
  }
}

// node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
function defaultOffset(arr) {
  const offset = [0];
  fillOffset(offset, arr.length - 1);
  return offset;
}

// node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
function convertOffsetToTimes(offset, duration) {
  return offset.map((o) => o * duration);
}

// node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease: ease3 = "easeInOut" }) {
  const easingFunctions = isEasingArray(ease3) ? ease3.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease3);
  const state = {
    done: false,
    value: keyframeValues[0]
  };
  const absoluteTimes = convertOffsetToTimes(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues),
    duration
  );
  const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, {
    ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
  });
  return {
    calculatedDuration: duration,
    next: (t) => {
      state.value = mapTimeToKeyframe(t);
      state.done = t >= duration;
      return state;
    }
  };
}

// node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var isNotNull = (value) => value !== null;
function getFinalKeyframe(keyframes3, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
  const resolvedKeyframes = keyframes3.filter(isNotNull);
  const useFirstKeyframe = speed < 0 || repeat && repeatType !== "loop" && repeat % 2 === 1;
  const index = useFirstKeyframe ? 0 : resolvedKeyframes.length - 1;
  return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}

// node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var transitionTypeMap = {
  decay: inertia,
  inertia,
  tween: keyframes,
  keyframes,
  spring
};
function replaceTransitionType(transition) {
  if (typeof transition.type === "string") {
    transition.type = transitionTypeMap[transition.type];
  }
}

// node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var WithPromise = class {
  constructor() {
    this.count = 0;
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this.count++;
    this._finished = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(onResolve, onReject) {
    return this.finished.then(onResolve, onReject);
  }
};

// node_modules/motion-dom/dist/es/animation/JSAnimation.mjs
var percentToProgress = (percent3) => percent3 / 100;
var JSAnimation = class extends WithPromise {
  constructor(options) {
    super();
    this.state = "idle";
    this.startTime = null;
    this.isStopped = false;
    this.currentTime = 0;
    this.holdTime = null;
    this.playbackSpeed = 1;
    this.stop = () => {
      const { motionValue: motionValue3 } = this.options;
      if (motionValue3 && motionValue3.updatedAt !== time.now()) {
        this.tick(time.now());
      }
      this.isStopped = true;
      if (this.state === "idle")
        return;
      this.teardown();
      const { onStop } = this.options;
      onStop && onStop();
    };
    activeAnimations.mainThread++;
    this.options = options;
    this.initAnimation();
    this.play();
    if (options.autoplay === false)
      this.pause();
  }
  initAnimation() {
    const { options } = this;
    replaceTransitionType(options);
    const { type = keyframes, repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = options;
    let { keyframes: keyframes$1 } = options;
    const generatorFactory = type || keyframes;
    if (generatorFactory !== keyframes) {
      invariant(keyframes$1.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${keyframes$1}`);
    }
    if (generatorFactory !== keyframes && typeof keyframes$1[0] !== "number") {
      this.mixKeyframes = pipe(percentToProgress, mix(keyframes$1[0], keyframes$1[1]));
      keyframes$1 = [0, 100];
    }
    const generator = generatorFactory({ ...options, keyframes: keyframes$1 });
    if (repeatType === "mirror") {
      this.mirroredGenerator = generatorFactory({
        ...options,
        keyframes: [...keyframes$1].reverse(),
        velocity: -velocity
      });
    }
    if (generator.calculatedDuration === null) {
      generator.calculatedDuration = calcGeneratorDuration(generator);
    }
    const { calculatedDuration } = generator;
    this.calculatedDuration = calculatedDuration;
    this.resolvedDuration = calculatedDuration + repeatDelay;
    this.totalDuration = this.resolvedDuration * (repeat + 1) - repeatDelay;
    this.generator = generator;
  }
  updateTime(timestamp) {
    const animationTime = Math.round(timestamp - this.startTime) * this.playbackSpeed;
    if (this.holdTime !== null) {
      this.currentTime = this.holdTime;
    } else {
      this.currentTime = animationTime;
    }
  }
  tick(timestamp, sample = false) {
    const { generator, totalDuration, mixKeyframes, mirroredGenerator, resolvedDuration, calculatedDuration } = this;
    if (this.startTime === null)
      return generator.next(0);
    const { delay: delay3 = 0, keyframes: keyframes3, repeat, repeatType, repeatDelay, type, onUpdate, finalKeyframe } = this.options;
    if (this.speed > 0) {
      this.startTime = Math.min(this.startTime, timestamp);
    } else if (this.speed < 0) {
      this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
    }
    if (sample) {
      this.currentTime = timestamp;
    } else {
      this.updateTime(timestamp);
    }
    const timeWithoutDelay = this.currentTime - delay3 * (this.playbackSpeed >= 0 ? 1 : -1);
    const isInDelayPhase = this.playbackSpeed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
    this.currentTime = Math.max(timeWithoutDelay, 0);
    if (this.state === "finished" && this.holdTime === null) {
      this.currentTime = totalDuration;
    }
    let elapsed = this.currentTime;
    let frameGenerator = generator;
    if (repeat) {
      const progress3 = Math.min(this.currentTime, totalDuration) / resolvedDuration;
      let currentIteration = Math.floor(progress3);
      let iterationProgress = progress3 % 1;
      if (!iterationProgress && progress3 >= 1) {
        iterationProgress = 1;
      }
      iterationProgress === 1 && currentIteration--;
      currentIteration = Math.min(currentIteration, repeat + 1);
      const isOddIteration = Boolean(currentIteration % 2);
      if (isOddIteration) {
        if (repeatType === "reverse") {
          iterationProgress = 1 - iterationProgress;
          if (repeatDelay) {
            iterationProgress -= repeatDelay / resolvedDuration;
          }
        } else if (repeatType === "mirror") {
          frameGenerator = mirroredGenerator;
        }
      }
      elapsed = clamp(0, 1, iterationProgress) * resolvedDuration;
    }
    const state = isInDelayPhase ? { done: false, value: keyframes3[0] } : frameGenerator.next(elapsed);
    if (mixKeyframes) {
      state.value = mixKeyframes(state.value);
    }
    let { done } = state;
    if (!isInDelayPhase && calculatedDuration !== null) {
      done = this.playbackSpeed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
    }
    const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
    if (isAnimationFinished && type !== inertia) {
      state.value = getFinalKeyframe(keyframes3, this.options, finalKeyframe, this.speed);
    }
    if (onUpdate) {
      onUpdate(state.value);
    }
    if (isAnimationFinished) {
      this.finish();
    }
    return state;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(resolve, reject) {
    return this.finished.then(resolve, reject);
  }
  get duration() {
    return millisecondsToSeconds(this.calculatedDuration);
  }
  get time() {
    return millisecondsToSeconds(this.currentTime);
  }
  set time(newTime) {
    newTime = secondsToMilliseconds(newTime);
    this.currentTime = newTime;
    if (this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0) {
      this.holdTime = newTime;
    } else if (this.driver) {
      this.startTime = this.driver.now() - newTime / this.playbackSpeed;
    }
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(newSpeed) {
    this.updateTime(time.now());
    const hasChanged = this.playbackSpeed !== newSpeed;
    this.playbackSpeed = newSpeed;
    if (hasChanged) {
      this.time = millisecondsToSeconds(this.currentTime);
    }
  }
  play() {
    if (this.isStopped)
      return;
    const { driver = frameloopDriver, onPlay, startTime } = this.options;
    if (!this.driver) {
      this.driver = driver((timestamp) => this.tick(timestamp));
    }
    onPlay && onPlay();
    const now3 = this.driver.now();
    if (this.state === "finished") {
      this.updateFinished();
      this.startTime = now3;
    } else if (this.holdTime !== null) {
      this.startTime = now3 - this.holdTime;
    } else if (!this.startTime) {
      this.startTime = startTime ?? now3;
    }
    if (this.state === "finished" && this.speed < 0) {
      this.startTime += this.calculatedDuration;
    }
    this.holdTime = null;
    this.state = "running";
    this.driver.start();
  }
  pause() {
    this.state = "paused";
    this.updateTime(time.now());
    this.holdTime = this.currentTime;
  }
  complete() {
    if (this.state !== "running") {
      this.play();
    }
    this.state = "finished";
    this.holdTime = null;
  }
  finish() {
    this.teardown();
    this.state = "finished";
    const { onComplete } = this.options;
    onComplete && onComplete();
  }
  cancel() {
    this.holdTime = null;
    this.startTime = 0;
    this.tick(0);
    this.teardown();
  }
  teardown() {
    this.notifyFinished();
    this.state = "idle";
    this.stopDriver();
    this.startTime = this.holdTime = null;
    activeAnimations.mainThread--;
  }
  stopDriver() {
    if (!this.driver)
      return;
    this.driver.stop();
    this.driver = void 0;
  }
  sample(sampleTime) {
    this.startTime = 0;
    return this.tick(sampleTime, true);
  }
  attachTimeline(timeline) {
    if (this.options.allowFlatten) {
      this.options.type = "keyframes";
      this.options.ease = "linear";
      this.initAnimation();
    }
    return timeline.observe(this);
  }
};

// node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function fillWildcards(keyframes3) {
  for (let i = 1; i < keyframes3.length; i++) {
    keyframes3[i] ?? (keyframes3[i] = keyframes3[i - 1]);
  }
}

// node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
var radToDeg = (rad) => rad * 180 / Math.PI;
var rotate = (v) => {
  const angle = radToDeg(Math.atan2(v[1], v[0]));
  return rebaseAngle(angle);
};
var matrix2dParsers = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (v) => (Math.abs(v[0]) + Math.abs(v[3])) / 2,
  rotate,
  rotateZ: rotate,
  skewX: (v) => radToDeg(Math.atan(v[1])),
  skewY: (v) => radToDeg(Math.atan(v[2])),
  skew: (v) => (Math.abs(v[1]) + Math.abs(v[2])) / 2
};
var rebaseAngle = (angle) => {
  angle = angle % 360;
  if (angle < 0)
    angle += 360;
  return angle;
};
var rotateZ = rotate;
var scaleX = (v) => Math.sqrt(v[0] * v[0] + v[1] * v[1]);
var scaleY = (v) => Math.sqrt(v[4] * v[4] + v[5] * v[5]);
var matrix3dParsers = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX,
  scaleY,
  scale: (v) => (scaleX(v) + scaleY(v)) / 2,
  rotateX: (v) => rebaseAngle(radToDeg(Math.atan2(v[6], v[5]))),
  rotateY: (v) => rebaseAngle(radToDeg(Math.atan2(-v[2], v[0]))),
  rotateZ,
  rotate: rotateZ,
  skewX: (v) => radToDeg(Math.atan(v[4])),
  skewY: (v) => radToDeg(Math.atan(v[1])),
  skew: (v) => (Math.abs(v[1]) + Math.abs(v[4])) / 2
};
function defaultTransformValue(name) {
  return name.includes("scale") ? 1 : 0;
}
function parseValueFromTransform(transform, name) {
  if (!transform || transform === "none") {
    return defaultTransformValue(name);
  }
  const matrix3dMatch = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let parsers;
  let match;
  if (matrix3dMatch) {
    parsers = matrix3dParsers;
    match = matrix3dMatch;
  } else {
    const matrix2dMatch = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    parsers = matrix2dParsers;
    match = matrix2dMatch;
  }
  if (!match) {
    return defaultTransformValue(name);
  }
  const valueParser = parsers[name];
  const values = match[1].split(",").map(convertTransformToNumber);
  return typeof valueParser === "function" ? valueParser(values) : values[valueParser];
}
var readTransformValue = (instance, name) => {
  const { transform = "none" } = getComputedStyle(instance);
  return parseValueFromTransform(transform, name);
};
function convertTransformToNumber(value) {
  return parseFloat(value.trim());
}

// node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
var transformPropOrder = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
];
var transformProps = /* @__PURE__ */ (() => new Set(transformPropOrder))();

// node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs
var isNumOrPxType = (v) => v === number || v === px;
var transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
  const removedTransforms = [];
  nonTranslationalTransformKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  return removedTransforms;
}
var positionalValues = {
  // Dimensions
  width: ({ x }, { paddingLeft = "0", paddingRight = "0" }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
  height: ({ y }, { paddingTop = "0", paddingBottom = "0" }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
  top: (_bbox, { top }) => parseFloat(top),
  left: (_bbox, { left }) => parseFloat(left),
  bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
  right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
  // Transform
  x: (_bbox, { transform }) => parseValueFromTransform(transform, "x"),
  y: (_bbox, { transform }) => parseValueFromTransform(transform, "y")
};
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;

// node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
var toResolve = /* @__PURE__ */ new Set();
var isScheduled = false;
var anyNeedsMeasurement = false;
var isForced = false;
function measureAllKeyframes() {
  if (anyNeedsMeasurement) {
    const resolversToMeasure = Array.from(toResolve).filter((resolver) => resolver.needsMeasurement);
    const elementsToMeasure = new Set(resolversToMeasure.map((resolver) => resolver.element));
    const transformsToRestore = /* @__PURE__ */ new Map();
    elementsToMeasure.forEach((element) => {
      const removedTransforms = removeNonTranslationalTransform(element);
      if (!removedTransforms.length)
        return;
      transformsToRestore.set(element, removedTransforms);
      element.render();
    });
    resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
    elementsToMeasure.forEach((element) => {
      element.render();
      const restore = transformsToRestore.get(element);
      if (restore) {
        restore.forEach(([key, value]) => {
          element.getValue(key)?.set(value);
        });
      }
    });
    resolversToMeasure.forEach((resolver) => resolver.measureEndState());
    resolversToMeasure.forEach((resolver) => {
      if (resolver.suspendedScrollY !== void 0) {
        window.scrollTo(0, resolver.suspendedScrollY);
      }
    });
  }
  anyNeedsMeasurement = false;
  isScheduled = false;
  toResolve.forEach((resolver) => resolver.complete(isForced));
  toResolve.clear();
}
function readAllKeyframes() {
  toResolve.forEach((resolver) => {
    resolver.readKeyframes();
    if (resolver.needsMeasurement) {
      anyNeedsMeasurement = true;
    }
  });
}
function flushKeyframeResolvers() {
  isForced = true;
  readAllKeyframes();
  measureAllKeyframes();
  isForced = false;
}
var KeyframeResolver = class {
  constructor(unresolvedKeyframes, onComplete, name, motionValue3, element, isAsync = false) {
    this.isComplete = false;
    this.isAsync = false;
    this.needsMeasurement = false;
    this.isScheduled = false;
    this.unresolvedKeyframes = [...unresolvedKeyframes];
    this.onComplete = onComplete;
    this.name = name;
    this.motionValue = motionValue3;
    this.element = element;
    this.isAsync = isAsync;
  }
  scheduleResolve() {
    this.isScheduled = true;
    if (this.isAsync) {
      toResolve.add(this);
      if (!isScheduled) {
        isScheduled = true;
        frame.read(readAllKeyframes);
        frame.resolveKeyframes(measureAllKeyframes);
      }
    } else {
      this.readKeyframes();
      this.complete();
    }
  }
  readKeyframes() {
    const { unresolvedKeyframes, name, element, motionValue: motionValue3 } = this;
    if (unresolvedKeyframes[0] === null) {
      const currentValue = motionValue3?.get();
      const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
      if (currentValue !== void 0) {
        unresolvedKeyframes[0] = currentValue;
      } else if (element && name) {
        const valueAsRead = element.readValue(name, finalKeyframe);
        if (valueAsRead !== void 0 && valueAsRead !== null) {
          unresolvedKeyframes[0] = valueAsRead;
        }
      }
      if (unresolvedKeyframes[0] === void 0) {
        unresolvedKeyframes[0] = finalKeyframe;
      }
      if (motionValue3 && currentValue === void 0) {
        motionValue3.set(unresolvedKeyframes[0]);
      }
    }
    fillWildcards(unresolvedKeyframes);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(isForced3 = false) {
    this.isComplete = true;
    this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, isForced3);
    toResolve.delete(this);
  }
  cancel() {
    if (!this.isComplete) {
      this.isScheduled = false;
      toResolve.delete(this);
    }
  }
  resume() {
    if (!this.isComplete)
      this.scheduleResolve();
  }
};

// node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs
var isCSSVar = (name) => name.startsWith("--");

// node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function setStyle(element, name, value) {
  isCSSVar(name) ? element.style.setProperty(name, value) : element.style[name] = value;
}

// node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var supportsScrollTimeline = /* @__PURE__ */ memo(() => window.ScrollTimeline !== void 0);

// node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var supportsFlags = {};

// node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function memoSupports(callback, supportsFlag) {
  const memoized = memo(callback);
  return () => supportsFlags[supportsFlag] ?? memoized();
}

// node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs
var supportsLinearEasing = /* @__PURE__ */ memoSupports(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch (e) {
    return false;
  }
  return true;
}, "linearEasing");

// node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs
var cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;

// node_modules/motion-dom/dist/es/animation/waapi/easing/supported.mjs
var supportedWaapiEasing = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ cubicBezierAsString([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ cubicBezierAsString([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ cubicBezierAsString([0.33, 1.53, 0.69, 0.99])
};

// node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function mapEasingToNativeEasing(easing, duration) {
  if (!easing) {
    return void 0;
  } else if (typeof easing === "function") {
    return supportsLinearEasing() ? generateLinearEasing(easing, duration) : "ease-out";
  } else if (isBezierDefinition(easing)) {
    return cubicBezierAsString(easing);
  } else if (Array.isArray(easing)) {
    return easing.map((segmentEasing) => mapEasingToNativeEasing(segmentEasing, duration) || supportedWaapiEasing.easeOut);
  } else {
    return supportedWaapiEasing[easing];
  }
}

// node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function startWaapiAnimation(element, valueName, keyframes3, { delay: delay3 = 0, duration = 300, repeat = 0, repeatType = "loop", ease: ease3 = "easeOut", times } = {}, pseudoElement = void 0) {
  const keyframeOptions = {
    [valueName]: keyframes3
  };
  if (times)
    keyframeOptions.offset = times;
  const easing = mapEasingToNativeEasing(ease3, duration);
  if (Array.isArray(easing))
    keyframeOptions.easing = easing;
  if (statsBuffer.value) {
    activeAnimations.waapi++;
  }
  const options = {
    delay: delay3,
    duration,
    easing: !Array.isArray(easing) ? easing : "linear",
    fill: "both",
    iterations: repeat + 1,
    direction: repeatType === "reverse" ? "alternate" : "normal"
  };
  if (pseudoElement)
    options.pseudoElement = pseudoElement;
  const animation = element.animate(keyframeOptions, options);
  if (statsBuffer.value) {
    animation.finished.finally(() => {
      activeAnimations.waapi--;
    });
  }
  return animation;
}

// node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function isGenerator(type) {
  return typeof type === "function" && "applyToOptions" in type;
}

// node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function applyGeneratorOptions({ type, ...options }) {
  if (isGenerator(type) && supportsLinearEasing()) {
    return type.applyToOptions(options);
  } else {
    options.duration ?? (options.duration = 300);
    options.ease ?? (options.ease = "easeOut");
  }
  return options;
}

// node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var NativeAnimation = class extends WithPromise {
  constructor(options) {
    super();
    this.finishedTime = null;
    this.isStopped = false;
    if (!options)
      return;
    const { element, name, keyframes: keyframes3, pseudoElement, allowFlatten = false, finalKeyframe, onComplete } = options;
    this.isPseudoElement = Boolean(pseudoElement);
    this.allowFlatten = allowFlatten;
    this.options = options;
    invariant(typeof options.type !== "string", `animateMini doesn't support "type" as a string. Did you mean to import { spring } from "motion"?`);
    const transition = applyGeneratorOptions(options);
    this.animation = startWaapiAnimation(element, name, keyframes3, transition, pseudoElement);
    if (transition.autoplay === false) {
      this.animation.pause();
    }
    this.animation.onfinish = () => {
      this.finishedTime = this.time;
      if (!pseudoElement) {
        const keyframe = getFinalKeyframe(keyframes3, this.options, finalKeyframe, this.speed);
        if (this.updateMotionValue) {
          this.updateMotionValue(keyframe);
        } else {
          setStyle(element, name, keyframe);
        }
        this.animation.cancel();
      }
      onComplete?.();
      this.notifyFinished();
    };
    this.animation.oncancel = () => this.notifyFinished();
  }
  play() {
    if (this.isStopped)
      return;
    this.animation.play();
    if (this.state === "finished") {
      this.updateFinished();
    }
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch (e) {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = true;
    const { state } = this;
    if (state === "idle" || state === "finished") {
      return;
    }
    if (this.updateMotionValue) {
      this.updateMotionValue();
    } else {
      this.commitStyles();
    }
    if (!this.isPseudoElement)
      this.cancel();
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    if (!this.isPseudoElement) {
      this.animation.commitStyles?.();
    }
  }
  get duration() {
    const duration = this.animation.effect?.getComputedTiming?.().duration || 0;
    return millisecondsToSeconds(Number(duration));
  }
  get time() {
    return millisecondsToSeconds(Number(this.animation.currentTime) || 0);
  }
  set time(newTime) {
    this.finishedTime = null;
    this.animation.currentTime = secondsToMilliseconds(newTime);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(newSpeed) {
    if (newSpeed < 0)
      this.finishedTime = null;
    this.animation.playbackRate = newSpeed;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(newStartTime) {
    this.animation.startTime = newStartTime;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline, observe }) {
    if (this.allowFlatten) {
      this.animation.effect?.updateTiming({ easing: "linear" });
    }
    this.animation.onfinish = null;
    if (timeline && supportsScrollTimeline()) {
      this.animation.timeline = timeline;
      return noop;
    } else {
      return observe(this);
    }
  }
};

// node_modules/motion-dom/dist/es/animation/waapi/utils/unsupported-easing.mjs
var unsupportedEasingFunctions = {
  anticipate,
  backInOut,
  circInOut
};
function isUnsupportedEase(key) {
  return key in unsupportedEasingFunctions;
}
function replaceStringEasing(transition) {
  if (typeof transition.ease === "string" && isUnsupportedEase(transition.ease)) {
    transition.ease = unsupportedEasingFunctions[transition.ease];
  }
}

// node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs
var sampleDelta = 10;
var NativeAnimationExtended = class extends NativeAnimation {
  constructor(options) {
    replaceStringEasing(options);
    replaceTransitionType(options);
    super(options);
    if (options.startTime) {
      this.startTime = options.startTime;
    }
    this.options = options;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read commited styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(value) {
    const { motionValue: motionValue3, onUpdate, onComplete, element, ...options } = this.options;
    if (!motionValue3)
      return;
    if (value !== void 0) {
      motionValue3.set(value);
      return;
    }
    const sampleAnimation = new JSAnimation({
      ...options,
      autoplay: false
    });
    const sampleTime = secondsToMilliseconds(this.finishedTime ?? this.time);
    motionValue3.setWithVelocity(sampleAnimation.sample(sampleTime - sampleDelta).value, sampleAnimation.sample(sampleTime).value, sampleDelta);
    sampleAnimation.stop();
  }
};

// node_modules/motion-dom/dist/es/animation/utils/is-animatable.mjs
var isAnimatable = (value, name) => {
  if (name === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && // It's animatable if we have a string
  (complex.test(value) || value === "0") && // And it contains numbers and/or colors
  !value.startsWith("url(")) {
    return true;
  }
  return false;
};

// node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
function hasKeyframesChanged(keyframes3) {
  const current = keyframes3[0];
  if (keyframes3.length === 1)
    return true;
  for (let i = 0; i < keyframes3.length; i++) {
    if (keyframes3[i] !== current)
      return true;
  }
}
function canAnimate(keyframes3, name, type, velocity) {
  const originKeyframe = keyframes3[0];
  if (originKeyframe === null)
    return false;
  if (name === "display" || name === "visibility")
    return true;
  const targetKeyframe = keyframes3[keyframes3.length - 1];
  const isOriginAnimatable = isAnimatable(originKeyframe, name);
  const isTargetAnimatable = isAnimatable(targetKeyframe, name);
  warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". ${originKeyframe} is not an animatable value - to enable this animation set ${originKeyframe} to a value animatable to ${targetKeyframe} via the \`style\` property.`);
  if (!isOriginAnimatable || !isTargetAnimatable) {
    return false;
  }
  return hasKeyframesChanged(keyframes3) || (type === "spring" || isGenerator(type)) && velocity;
}

// node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
var acceleratedValues = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);
var supportsWaapi = /* @__PURE__ */ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(options) {
  const { motionValue: motionValue3, name, repeatDelay, repeatType, damping, type } = options;
  if (!motionValue3 || !motionValue3.owner || !(motionValue3.owner.current instanceof HTMLElement)) {
    return false;
  }
  const { onUpdate, transformTemplate } = motionValue3.owner.getProps();
  return supportsWaapi() && name && acceleratedValues.has(name) && (name !== "transform" || !transformTemplate) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
}

// node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
var MAX_RESOLVE_DELAY = 40;
var AsyncMotionValueAnimation = class extends WithPromise {
  constructor({ autoplay = true, delay: delay3 = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes: keyframes3, name, motionValue: motionValue3, element, ...options }) {
    super();
    this.stop = () => {
      if (this._animation) {
        this._animation.stop();
        this.stopTimeline?.();
      } else {
        this.keyframeResolver?.cancel();
      }
    };
    this.createdAt = time.now();
    const optionsWithDefaults = {
      autoplay,
      delay: delay3,
      type,
      repeat,
      repeatDelay,
      repeatType,
      name,
      motionValue: motionValue3,
      element,
      ...options
    };
    const KeyframeResolver$1 = element?.KeyframeResolver || KeyframeResolver;
    this.keyframeResolver = new KeyframeResolver$1(keyframes3, (resolvedKeyframes, finalKeyframe, forced) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue3, element);
    this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(keyframes3, finalKeyframe, options, sync) {
    this.keyframeResolver = void 0;
    const { name, type, velocity, delay: delay3, isHandoff, onUpdate } = options;
    this.resolvedAt = time.now();
    if (!canAnimate(keyframes3, name, type, velocity)) {
      if (MotionGlobalConfig.instantAnimations || !delay3) {
        onUpdate?.(getFinalKeyframe(keyframes3, options, finalKeyframe));
      }
      keyframes3[0] = keyframes3[keyframes3.length - 1];
      options.duration = 0;
      options.repeat = 0;
    }
    const startTime = sync ? !this.resolvedAt ? this.createdAt : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : void 0;
    const resolvedOptions = {
      startTime,
      finalKeyframe,
      ...options,
      keyframes: keyframes3
    };
    const animation = !isHandoff && supportsBrowserAnimation(resolvedOptions) ? new NativeAnimationExtended({
      ...resolvedOptions,
      element: resolvedOptions.motionValue.owner.current
    }) : new JSAnimation(resolvedOptions);
    animation.finished.then(() => this.notifyFinished()).catch(noop);
    if (this.pendingTimeline) {
      this.stopTimeline = animation.attachTimeline(this.pendingTimeline);
      this.pendingTimeline = void 0;
    }
    this._animation = animation;
  }
  get finished() {
    if (!this._animation) {
      return this._finished;
    } else {
      return this.animation.finished;
    }
  }
  then(onResolve, _onReject) {
    return this.finished.finally(onResolve).then(() => {
    });
  }
  get animation() {
    if (!this._animation) {
      flushKeyframeResolvers();
    }
    return this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get time() {
    return this.animation.time;
  }
  set time(newTime) {
    this.animation.time = newTime;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(newSpeed) {
    this.animation.speed = newSpeed;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(timeline) {
    if (this._animation) {
      this.stopTimeline = this.animation.attachTimeline(timeline);
    } else {
      this.pendingTimeline = timeline;
    }
    return () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this.animation.cancel();
  }
};

// node_modules/motion-dom/dist/es/animation/utils/css-variables-conversion.mjs
var splitCSSVariableRegex = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function parseCSSVariable(current) {
  const match = splitCSSVariableRegex.exec(current);
  if (!match)
    return [,];
  const [, token1, token2, fallback] = match;
  return [`--${token1 ?? token2}`, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
  invariant(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`);
  const [token, fallback] = parseCSSVariable(current);
  if (!token)
    return;
  const resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    const trimmed = resolved.trim();
    return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
  }
  return isCSSVariableToken(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
}

// node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function getValueTransition(transition, key) {
  return transition?.[key] ?? transition?.["default"] ?? transition;
}

// node_modules/motion-dom/dist/es/render/utils/keys-position.mjs
var positionalKeys = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...transformPropOrder
]);

// node_modules/motion-dom/dist/es/value/types/auto.mjs
var auto = {
  test: (v) => v === "auto",
  parse: (v) => v
};

// node_modules/motion-dom/dist/es/value/types/test.mjs
var testValueType = (v) => (type) => type.test(v);

// node_modules/motion-dom/dist/es/value/types/dimensions.mjs
var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
var findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));

// node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function isNone(value) {
  if (typeof value === "number") {
    return value === 0;
  } else if (value !== null) {
    return value === "none" || value === "0" || isZeroValueString(value);
  } else {
    return true;
  }
}

// node_modules/motion-dom/dist/es/value/types/complex/filter.mjs
var maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
  const [name, value] = v.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v;
  const [number3] = value.match(floatRegex) || [];
  if (!number3)
    return v;
  const unit = value.replace(number3, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number3 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
var functionRegex = /\b([a-z-]*)\(.*?\)/gu;
var filter = {
  ...complex,
  getAnimatableNone: (v) => {
    const functions = v.match(functionRegex);
    return functions ? functions.map(applyDefaultFilter).join(" ") : v;
  }
};

// node_modules/motion-dom/dist/es/value/types/int.mjs
var int = {
  ...number,
  transform: Math.round
};

// node_modules/motion-dom/dist/es/value/types/maps/transform.mjs
var transformValueTypes = {
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px
};

// node_modules/motion-dom/dist/es/value/types/maps/number.mjs
var numberValueTypes = {
  // Border props
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  // Positioning props
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  // Spacing props
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  // Misc
  backgroundPositionX: px,
  backgroundPositionY: px,
  ...transformValueTypes,
  zIndex: int,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};

// node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs
var defaultValueTypes = {
  ...numberValueTypes,
  // Color props
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  // Border props
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  filter,
  WebkitFilter: filter
};
var getDefaultValueType = (key) => defaultValueTypes[key];

// node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs
function getAnimatableNone2(key, value) {
  let defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}

// node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
var invalidTemplates = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
  let i = 0;
  let animatableTemplate = void 0;
  while (i < unresolvedKeyframes.length && !animatableTemplate) {
    const keyframe = unresolvedKeyframes[i];
    if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && analyseComplexValue(keyframe).values.length) {
      animatableTemplate = unresolvedKeyframes[i];
    }
    i++;
  }
  if (animatableTemplate && name) {
    for (const noneIndex of noneKeyframeIndexes) {
      unresolvedKeyframes[noneIndex] = getAnimatableNone2(name, animatableTemplate);
    }
  }
}

// node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var DOMKeyframesResolver = class extends KeyframeResolver {
  constructor(unresolvedKeyframes, onComplete, name, motionValue3, element) {
    super(unresolvedKeyframes, onComplete, name, motionValue3, element, true);
  }
  readKeyframes() {
    const { unresolvedKeyframes, element, name } = this;
    if (!element || !element.current)
      return;
    super.readKeyframes();
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      let keyframe = unresolvedKeyframes[i];
      if (typeof keyframe === "string") {
        keyframe = keyframe.trim();
        if (isCSSVariableToken(keyframe)) {
          const resolved = getVariableValue(keyframe, element.current);
          if (resolved !== void 0) {
            unresolvedKeyframes[i] = resolved;
          }
          if (i === unresolvedKeyframes.length - 1) {
            this.finalKeyframe = keyframe;
          }
        }
      }
    }
    this.resolveNoneKeyframes();
    if (!positionalKeys.has(name) || unresolvedKeyframes.length !== 2) {
      return;
    }
    const [origin, target] = unresolvedKeyframes;
    const originType = findDimensionValueType(origin);
    const targetType = findDimensionValueType(target);
    if (originType === targetType)
      return;
    if (isNumOrPxType(originType) && isNumOrPxType(targetType)) {
      for (let i = 0; i < unresolvedKeyframes.length; i++) {
        const value = unresolvedKeyframes[i];
        if (typeof value === "string") {
          unresolvedKeyframes[i] = parseFloat(value);
        }
      }
    } else {
      this.needsMeasurement = true;
    }
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes, name } = this;
    const noneKeyframeIndexes = [];
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      if (unresolvedKeyframes[i] === null || isNone(unresolvedKeyframes[i])) {
        noneKeyframeIndexes.push(i);
      }
    }
    if (noneKeyframeIndexes.length) {
      makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name);
    }
  }
  measureInitialState() {
    const { element, unresolvedKeyframes, name } = this;
    if (!element || !element.current)
      return;
    if (name === "height") {
      this.suspendedScrollY = window.pageYOffset;
    }
    this.measuredOrigin = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    unresolvedKeyframes[0] = this.measuredOrigin;
    const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
    if (measureKeyframe !== void 0) {
      element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
    }
  }
  measureEndState() {
    const { element, name, unresolvedKeyframes } = this;
    if (!element || !element.current)
      return;
    const value = element.getValue(name);
    value && value.jump(this.measuredOrigin, false);
    const finalKeyframeIndex = unresolvedKeyframes.length - 1;
    const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
    unresolvedKeyframes[finalKeyframeIndex] = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    if (finalKeyframe !== null && this.finalKeyframe === void 0) {
      this.finalKeyframe = finalKeyframe;
    }
    if (this.removedTransforms?.length) {
      this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
        element.getValue(unsetTransformName).set(unsetTransformValue);
      });
    }
    this.resolveNoneKeyframes();
  }
};

// node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function resolveElements(elementOrSelector, scope, selectorCache) {
  if (elementOrSelector instanceof EventTarget) {
    return [elementOrSelector];
  } else if (typeof elementOrSelector === "string") {
    let root = document;
    if (scope) {
      root = scope.current;
    }
    const elements = selectorCache?.[elementOrSelector] ?? root.querySelectorAll(elementOrSelector);
    return elements ? Array.from(elements) : [];
  }
  return Array.from(elementOrSelector);
}

// node_modules/motion-dom/dist/es/frameloop/microtask.mjs
var { schedule: microtask, cancel: cancelMicrotask } = /* @__PURE__ */ createRenderBatcher(queueMicrotask, false);

// node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs
var isDragging = {
  x: false,
  y: false
};
function isDragActive() {
  return isDragging.x || isDragging.y;
}

// node_modules/motion-dom/dist/es/gestures/drag/state/set-active.mjs
function setDragLock(axis) {
  if (axis === "x" || axis === "y") {
    if (isDragging[axis]) {
      return null;
    } else {
      isDragging[axis] = true;
      return () => {
        isDragging[axis] = false;
      };
    }
  } else {
    if (isDragging.x || isDragging.y) {
      return null;
    } else {
      isDragging.x = isDragging.y = true;
      return () => {
        isDragging.x = isDragging.y = false;
      };
    }
  }
}

// node_modules/motion-dom/dist/es/gestures/utils/setup.mjs
function setupGesture(elementOrSelector, options) {
  const elements = resolveElements(elementOrSelector);
  const gestureAbortController = new AbortController();
  const eventOptions = {
    passive: true,
    ...options,
    signal: gestureAbortController.signal
  };
  const cancel = () => gestureAbortController.abort();
  return [elements, eventOptions, cancel];
}

// node_modules/motion-dom/dist/es/gestures/hover.mjs
function isValidHover(event) {
  return !(event.pointerType === "touch" || isDragActive());
}
function hover(elementOrSelector, onHoverStart, options = {}) {
  const [elements, eventOptions, cancel] = setupGesture(elementOrSelector, options);
  const onPointerEnter = (enterEvent) => {
    if (!isValidHover(enterEvent))
      return;
    const { target } = enterEvent;
    const onHoverEnd = onHoverStart(target, enterEvent);
    if (typeof onHoverEnd !== "function" || !target)
      return;
    const onPointerLeave = (leaveEvent) => {
      if (!isValidHover(leaveEvent))
        return;
      onHoverEnd(leaveEvent);
      target.removeEventListener("pointerleave", onPointerLeave);
    };
    target.addEventListener("pointerleave", onPointerLeave, eventOptions);
  };
  elements.forEach((element) => {
    element.addEventListener("pointerenter", onPointerEnter, eventOptions);
  });
  return cancel;
}

// node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs
var isNodeOrChild = (parent, child) => {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};

// node_modules/motion-dom/dist/es/gestures/utils/is-primary-pointer.mjs
var isPrimaryPointer = (event) => {
  if (event.pointerType === "mouse") {
    return typeof event.button !== "number" || event.button <= 0;
  } else {
    return event.isPrimary !== false;
  }
};

// node_modules/motion-dom/dist/es/gestures/press/utils/is-keyboard-accessible.mjs
var focusableElements = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function isElementKeyboardAccessible(element) {
  return focusableElements.has(element.tagName) || element.tabIndex !== -1;
}

// node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs
var isPressing = /* @__PURE__ */ new WeakSet();

// node_modules/motion-dom/dist/es/gestures/press/utils/keyboard.mjs
function filterEvents(callback) {
  return (event) => {
    if (event.key !== "Enter")
      return;
    callback(event);
  };
}
function firePointerEvent(target, type) {
  target.dispatchEvent(new PointerEvent("pointer" + type, { isPrimary: true, bubbles: true }));
}
var enableKeyboardPress = (focusEvent, eventOptions) => {
  const element = focusEvent.currentTarget;
  if (!element)
    return;
  const handleKeydown = filterEvents(() => {
    if (isPressing.has(element))
      return;
    firePointerEvent(element, "down");
    const handleKeyup = filterEvents(() => {
      firePointerEvent(element, "up");
    });
    const handleBlur = () => firePointerEvent(element, "cancel");
    element.addEventListener("keyup", handleKeyup, eventOptions);
    element.addEventListener("blur", handleBlur, eventOptions);
  });
  element.addEventListener("keydown", handleKeydown, eventOptions);
  element.addEventListener("blur", () => element.removeEventListener("keydown", handleKeydown), eventOptions);
};

// node_modules/motion-dom/dist/es/gestures/press/index.mjs
function isValidPressEvent(event) {
  return isPrimaryPointer(event) && !isDragActive();
}
function press(targetOrSelector, onPressStart, options = {}) {
  const [targets, eventOptions, cancelEvents] = setupGesture(targetOrSelector, options);
  const startPress = (startEvent) => {
    const target = startEvent.currentTarget;
    if (!isValidPressEvent(startEvent) || isPressing.has(target))
      return;
    isPressing.add(target);
    const onPressEnd = onPressStart(target, startEvent);
    const onPointerEnd = (endEvent, success) => {
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
      if (!isValidPressEvent(endEvent) || !isPressing.has(target)) {
        return;
      }
      isPressing.delete(target);
      if (typeof onPressEnd === "function") {
        onPressEnd(endEvent, { success });
      }
    };
    const onPointerUp = (upEvent) => {
      onPointerEnd(upEvent, target === window || target === document || options.useGlobalTarget || isNodeOrChild(target, upEvent.target));
    };
    const onPointerCancel = (cancelEvent) => {
      onPointerEnd(cancelEvent, false);
    };
    window.addEventListener("pointerup", onPointerUp, eventOptions);
    window.addEventListener("pointercancel", onPointerCancel, eventOptions);
  };
  targets.forEach((target) => {
    const pointerDownTarget = options.useGlobalTarget ? window : target;
    pointerDownTarget.addEventListener("pointerdown", startPress, eventOptions);
    if (target instanceof HTMLElement) {
      target.addEventListener("focus", (event) => enableKeyboardPress(event, eventOptions));
      if (!isElementKeyboardAccessible(target) && !target.hasAttribute("tabindex")) {
        target.tabIndex = 0;
      }
    }
  });
  return cancelEvents;
}

// node_modules/motion-dom/dist/es/value/index.mjs
var MAX_VELOCITY_DELTA = 30;
var isFloat = (value) => {
  return !isNaN(parseFloat(value));
};
var collectMotionValues = {
  current: void 0
};
var MotionValue = class {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(init, options = {}) {
    this.version = "12.9.1";
    this.canTrackVelocity = null;
    this.events = {};
    this.updateAndNotify = (v, render = true) => {
      const currentTime = time.now();
      if (this.updatedAt !== currentTime) {
        this.setPrevFrameValue();
      }
      this.prev = this.current;
      this.setCurrent(v);
      if (this.current !== this.prev) {
        this.events.change?.notify(this.current);
      }
      if (render) {
        this.events.renderRequest?.notify(this.current);
      }
    };
    this.hasAnimated = false;
    this.setCurrent(init);
    this.owner = options.owner;
  }
  setCurrent(current) {
    this.current = current;
    this.updatedAt = time.now();
    if (this.canTrackVelocity === null && current !== void 0) {
      this.canTrackVelocity = isFloat(this.current);
    }
  }
  setPrevFrameValue(prevFrameValue = this.current) {
    this.prevFrameValue = prevFrameValue;
    this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(subscription) {
    if (true) {
      warnOnce(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
    }
    return this.on("change", subscription);
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    const unsubscribe = this.events[eventName].add(callback);
    if (eventName === "change") {
      return () => {
        unsubscribe();
        frame.read(() => {
          if (!this.events.change.getSize()) {
            this.stop();
          }
        });
      };
    }
    return unsubscribe;
  }
  clearListeners() {
    for (const eventManagers in this.events) {
      this.events[eventManagers].clear();
    }
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(passiveEffect, stopPassiveEffect) {
    this.passiveEffect = passiveEffect;
    this.stopPassiveEffect = stopPassiveEffect;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(v, render = true) {
    if (!render || !this.passiveEffect) {
      this.updateAndNotify(v, render);
    } else {
      this.passiveEffect(v, this.updateAndNotify);
    }
  }
  setWithVelocity(prev, current, delta) {
    this.set(current);
    this.prev = void 0;
    this.prevFrameValue = prev;
    this.prevUpdatedAt = this.updatedAt - delta;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(v, endAnimation = true) {
    this.updateAndNotify(v);
    this.prev = v;
    this.prevUpdatedAt = this.prevFrameValue = void 0;
    endAnimation && this.stop();
    if (this.stopPassiveEffect)
      this.stopPassiveEffect();
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    if (collectMotionValues.current) {
      collectMotionValues.current.push(this);
    }
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const currentTime = time.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
      return 0;
    }
    const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
    return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(startAnimation) {
    this.stop();
    return new Promise((resolve) => {
      this.hasAnimated = true;
      this.animation = startAnimation(resolve);
      if (this.events.animationStart) {
        this.events.animationStart.notify();
      }
    }).then(() => {
      if (this.events.animationComplete) {
        this.events.animationComplete.notify();
      }
      this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    if (this.animation) {
      this.animation.stop();
      if (this.events.animationCancel) {
        this.events.animationCancel.notify();
      }
    }
    this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.events.destroy?.notify();
    this.clearListeners();
    this.stop();
    if (this.stopPassiveEffect) {
      this.stopPassiveEffect();
    }
  }
};
function motionValue(init, options) {
  return new MotionValue(init, options);
}

// node_modules/motion-dom/dist/es/value/types/utils/find.mjs
var valueTypes = [...dimensionValueTypes, color, complex];
var findValueType = (v) => valueTypes.find(testValueType(v));

// node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs
var getValueAsType = (value, type) => {
  return type && typeof value === "number" ? type.transform(value) : value;
};

// node_modules/framer-motion/dist/es/context/LazyContext.mjs
var import_react8 = __toESM(require_react(), 1);
"use client";
var LazyContext = (0, import_react8.createContext)({ strict: false });

// node_modules/framer-motion/dist/es/motion/features/definitions.mjs
var featureProps = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
var featureDefinitions = {};
for (const key in featureProps) {
  featureDefinitions[key] = {
    isEnabled: (props) => featureProps[key].some((name) => !!props[name])
  };
}

// node_modules/framer-motion/dist/es/motion/features/load-features.mjs
function loadFeatures(features) {
  for (const key in features) {
    featureDefinitions[key] = {
      ...featureDefinitions[key],
      ...features[key]
    };
  }
}

// node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs
var validMotionProps = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function isValidMotionProp(key) {
  return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
}

// node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
var shouldForward = (key) => !isValidMotionProp(key);
function loadExternalIsValidProp(isValidProp) {
  if (!isValidProp)
    return;
  shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
}
try {
  loadExternalIsValidProp(__require("@emotion/is-prop-valid").default);
} catch {
}
function filterProps(props, isDom, forwardMotionProps) {
  const filteredProps = {};
  for (const key in props) {
    if (key === "values" && typeof props.values === "object")
      continue;
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || // If trying to use native HTML drag events, forward drag listeners
    props["draggable"] && key.startsWith("onDrag")) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}

// node_modules/framer-motion/dist/es/render/components/create-proxy.mjs
function createDOMMotionComponentProxy(componentFactory) {
  if (typeof Proxy === "undefined") {
    return componentFactory;
  }
  const componentCache = /* @__PURE__ */ new Map();
  const deprecatedFactoryFunction = (...args) => {
    if (true) {
      warnOnce(false, "motion() is deprecated. Use motion.create() instead.");
    }
    return componentFactory(...args);
  };
  return new Proxy(deprecatedFactoryFunction, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (_target, key) => {
      if (key === "create")
        return componentFactory;
      if (!componentCache.has(key)) {
        componentCache.set(key, componentFactory(key));
      }
      return componentCache.get(key);
    }
  });
}

// node_modules/framer-motion/dist/es/motion/index.mjs
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react14 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/context/MotionContext/index.mjs
var import_react9 = __toESM(require_react(), 1);
"use client";
var MotionContext = /* @__PURE__ */ (0, import_react9.createContext)({});

// node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
var import_react10 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs
function isAnimationControls(v) {
  return v !== null && typeof v === "object" && typeof v.start === "function";
}

// node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs
function isVariantLabel(v) {
  return typeof v === "string" || Array.isArray(v);
}

// node_modules/framer-motion/dist/es/render/utils/variant-props.mjs
var variantPriorityOrder = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
];
var variantProps = ["initial", ...variantPriorityOrder];

// node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs
function isControllingVariants(props) {
  return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
function isVariantNode(props) {
  return Boolean(isControllingVariants(props) || props.variants);
}

// node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
function getCurrentTreeVariants(props, context) {
  if (isControllingVariants(props)) {
    const { initial, animate } = props;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate) ? animate : void 0
    };
  }
  return props.inherit !== false ? context : {};
}

// node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
function useCreateMotionContext(props) {
  const { initial, animate } = getCurrentTreeVariants(props, (0, import_react10.useContext)(MotionContext));
  return (0, import_react10.useMemo)(() => ({ initial, animate }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
}
function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}

// node_modules/framer-motion/dist/es/motion/utils/symbol.mjs
var motionComponentSymbol = Symbol.for("motionComponentSymbol");

// node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
var import_react11 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/utils/is-ref-object.mjs
function isRefObject(ref) {
  return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}

// node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
function useMotionRef(visualState, visualElement, externalRef) {
  return (0, import_react11.useCallback)(
    (instance) => {
      if (instance) {
        visualState.onMount && visualState.onMount(instance);
      }
      if (visualElement) {
        if (instance) {
          visualElement.mount(instance);
        } else {
          visualElement.unmount();
        }
      }
      if (externalRef) {
        if (typeof externalRef === "function") {
          externalRef(instance);
        } else if (isRefObject(externalRef)) {
          externalRef.current = instance;
        }
      }
    },
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [visualElement]
  );
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
var import_react13 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs
var camelToDash = (str) => str.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();

// node_modules/framer-motion/dist/es/animation/optimized-appear/data-id.mjs
var optimizedAppearDataId = "framerAppearId";
var optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);

// node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs
var import_react12 = __toESM(require_react(), 1);
"use client";
var SwitchLayoutGroupContext = (0, import_react12.createContext)({});

// node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
function useVisualElement(Component3, visualState, props, createVisualElement, ProjectionNodeConstructor) {
  const { visualElement: parent } = (0, import_react13.useContext)(MotionContext);
  const lazyContext = (0, import_react13.useContext)(LazyContext);
  const presenceContext = (0, import_react13.useContext)(PresenceContext);
  const reducedMotionConfig = (0, import_react13.useContext)(MotionConfigContext).reducedMotion;
  const visualElementRef = (0, import_react13.useRef)(null);
  createVisualElement = createVisualElement || lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component3, {
      visualState,
      parent,
      props,
      presenceContext,
      blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
      reducedMotionConfig
    });
  }
  const visualElement = visualElementRef.current;
  const initialLayoutGroupConfig = (0, import_react13.useContext)(SwitchLayoutGroupContext);
  if (visualElement && !visualElement.projection && ProjectionNodeConstructor && (visualElement.type === "html" || visualElement.type === "svg")) {
    createProjectionNode(visualElementRef.current, props, ProjectionNodeConstructor, initialLayoutGroupConfig);
  }
  const isMounted = (0, import_react13.useRef)(false);
  (0, import_react13.useInsertionEffect)(() => {
    if (visualElement && isMounted.current) {
      visualElement.update(props, presenceContext);
    }
  });
  const optimisedAppearId = props[optimizedAppearDataAttribute];
  const wantsHandoff = (0, import_react13.useRef)(Boolean(optimisedAppearId) && !window.MotionHandoffIsComplete?.(optimisedAppearId) && window.MotionHasOptimisedAnimation?.(optimisedAppearId));
  useIsomorphicLayoutEffect(() => {
    if (!visualElement)
      return;
    isMounted.current = true;
    window.MotionIsMounted = true;
    visualElement.updateFeatures();
    microtask.render(visualElement.render);
    if (wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
  });
  (0, import_react13.useEffect)(() => {
    if (!visualElement)
      return;
    if (!wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
    if (wantsHandoff.current) {
      queueMicrotask(() => {
        window.MotionHandoffMarkAsComplete?.(optimisedAppearId);
      });
      wantsHandoff.current = false;
    }
  });
  return visualElement;
}
function createProjectionNode(visualElement, props, ProjectionNodeConstructor, initialPromotionConfig) {
  const { layoutId, layout: layout3, drag: drag3, dragConstraints, layoutScroll, layoutRoot, layoutCrossfade } = props;
  visualElement.projection = new ProjectionNodeConstructor(visualElement.latestValues, props["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(visualElement.parent));
  visualElement.projection.setOptions({
    layoutId,
    layout: layout3,
    alwaysMeasureLayout: Boolean(drag3) || dragConstraints && isRefObject(dragConstraints),
    visualElement,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof layout3 === "string" ? layout3 : "both",
    initialPromotionConfig,
    crossfade: layoutCrossfade,
    layoutScroll,
    layoutRoot
  });
}
function getClosestProjectingNode(visualElement) {
  if (!visualElement)
    return void 0;
  return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
}

// node_modules/framer-motion/dist/es/motion/index.mjs
"use client";
function createRendererMotionComponent({ preloadedFeatures, createVisualElement, useRender, useVisualState, Component: Component3 }) {
  preloadedFeatures && loadFeatures(preloadedFeatures);
  function MotionComponent(props, externalRef) {
    let MeasureLayout3;
    const configAndProps = {
      ...(0, import_react14.useContext)(MotionConfigContext),
      ...props,
      layoutId: useLayoutId(props)
    };
    const { isStatic } = configAndProps;
    const context = useCreateMotionContext(props);
    const visualState = useVisualState(props, isStatic);
    if (!isStatic && isBrowser) {
      useStrictMode(configAndProps, preloadedFeatures);
      const layoutProjection = getProjectionFunctionality(configAndProps);
      MeasureLayout3 = layoutProjection.MeasureLayout;
      context.visualElement = useVisualElement(Component3, visualState, configAndProps, createVisualElement, layoutProjection.ProjectionNode);
    }
    return (0, import_jsx_runtime.jsxs)(MotionContext.Provider, { value: context, children: [MeasureLayout3 && context.visualElement ? (0, import_jsx_runtime.jsx)(MeasureLayout3, { visualElement: context.visualElement, ...configAndProps }) : null, useRender(Component3, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement)] });
  }
  MotionComponent.displayName = `motion.${typeof Component3 === "string" ? Component3 : `create(${Component3.displayName ?? Component3.name ?? ""})`}`;
  const ForwardRefMotionComponent = (0, import_react14.forwardRef)(MotionComponent);
  ForwardRefMotionComponent[motionComponentSymbol] = Component3;
  return ForwardRefMotionComponent;
}
function useLayoutId({ layoutId }) {
  const layoutGroupId = (0, import_react14.useContext)(LayoutGroupContext).id;
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function useStrictMode(configAndProps, preloadedFeatures) {
  const isStrict = (0, import_react14.useContext)(LazyContext).strict;
  if (preloadedFeatures && isStrict) {
    const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
    configAndProps.ignoreStrict ? warning(false, strictMessage) : invariant(false, strictMessage);
  }
}
function getProjectionFunctionality(props) {
  const { drag: drag3, layout: layout3 } = featureDefinitions;
  if (!drag3 && !layout3)
    return {};
  const combined = { ...drag3, ...layout3 };
  return {
    MeasureLayout: drag3?.isEnabled(props) || layout3?.isEnabled(props) ? combined.MeasureLayout : void 0,
    ProjectionNode: combined.ProjectionNode
  };
}

// node_modules/framer-motion/dist/es/render/dom/use-render.mjs
var import_react17 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/render/html/use-props.mjs
var import_react15 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs
var scaleCorrectors = {};
function addScaleCorrector(correctors) {
  for (const key in correctors) {
    scaleCorrectors[key] = correctors[key];
    if (isCSSVariableName(key)) {
      scaleCorrectors[key].isCSSVariable = true;
    }
  }
}

// node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs
function isForcedMotionValue(key, { layout: layout3, layoutId }) {
  return transformProps.has(key) || key.startsWith("origin") || (layout3 || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}

// node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs
var isMotionValue = (value) => Boolean(value && value.getVelocity);

// node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs
var translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
var numTransforms = transformPropOrder.length;
function buildTransform(latestValues, transform, transformTemplate) {
  let transformString = "";
  let transformIsDefault = true;
  for (let i = 0; i < numTransforms; i++) {
    const key = transformPropOrder[i];
    const value = latestValues[key];
    if (value === void 0)
      continue;
    let valueIsDefault = true;
    if (typeof value === "number") {
      valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
    } else {
      valueIsDefault = parseFloat(value) === 0;
    }
    if (!valueIsDefault || transformTemplate) {
      const valueAsType = getValueAsType(value, numberValueTypes[key]);
      if (!valueIsDefault) {
        transformIsDefault = false;
        const transformName = translateAlias[key] || key;
        transformString += `${transformName}(${valueAsType}) `;
      }
      if (transformTemplate) {
        transform[key] = valueAsType;
      }
    }
  }
  transformString = transformString.trim();
  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}

// node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs
function buildHTMLStyles(state, latestValues, transformTemplate) {
  const { style, vars, transformOrigin } = state;
  let hasTransform3 = false;
  let hasTransformOrigin = false;
  for (const key in latestValues) {
    const value = latestValues[key];
    if (transformProps.has(key)) {
      hasTransform3 = true;
      continue;
    } else if (isCSSVariableName(key)) {
      vars[key] = value;
      continue;
    } else {
      const valueAsType = getValueAsType(value, numberValueTypes[key]);
      if (key.startsWith("origin")) {
        hasTransformOrigin = true;
        transformOrigin[key] = valueAsType;
      } else {
        style[key] = valueAsType;
      }
    }
  }
  if (!latestValues.transform) {
    if (hasTransform3 || transformTemplate) {
      style.transform = buildTransform(latestValues, state.transform, transformTemplate);
    } else if (style.transform) {
      style.transform = "none";
    }
  }
  if (hasTransformOrigin) {
    const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
    style.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}

// node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs
var createHtmlRenderState = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});

// node_modules/framer-motion/dist/es/render/html/use-props.mjs
function copyRawValuesOnly(target, source, props) {
  for (const key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}
function useInitialMotionValues({ transformTemplate }, visualState) {
  return (0, import_react15.useMemo)(() => {
    const state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, transformTemplate);
    return Object.assign({}, state.vars, state.style);
  }, [visualState]);
}
function useStyle(props, visualState) {
  const styleProp = props.style || {};
  const style = {};
  copyRawValuesOnly(style, styleProp, props);
  Object.assign(style, useInitialMotionValues(props, visualState));
  return style;
}
function useHTMLProps(props, visualState) {
  const htmlProps = {};
  const style = useStyle(props, visualState);
  if (props.drag && props.dragListener !== false) {
    htmlProps.draggable = false;
    style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
    style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
  }
  if (props.tabIndex === void 0 && (props.onTap || props.onTapStart || props.whileTap)) {
    htmlProps.tabIndex = 0;
  }
  htmlProps.style = style;
  return htmlProps;
}

// node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs
var lowercaseSVGElements = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];

// node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
function isSVGComponent(Component3) {
  if (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof Component3 !== "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    Component3.includes("-")
  ) {
    return false;
  } else if (
    /**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */
    lowercaseSVGElements.indexOf(Component3) > -1 || /**
     * If it contains a capital letter, it's an SVG component
     */
    /[A-Z]/u.test(Component3)
  ) {
    return true;
  }
  return false;
}

// node_modules/framer-motion/dist/es/render/svg/use-props.mjs
var import_react16 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/render/svg/utils/path.mjs
var dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
  attrs.pathLength = 1;
  const keys = useDashCase ? dashKeys : camelKeys;
  attrs[keys.offset] = px.transform(-offset);
  const pathLength = px.transform(length);
  const pathSpacing = px.transform(spacing);
  attrs[keys.array] = `${pathLength} ${pathSpacing}`;
}

// node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
function buildSVGAttrs(state, {
  attrX,
  attrY,
  attrScale,
  pathLength,
  pathSpacing = 1,
  pathOffset = 0,
  // This is object creation, which we try to avoid per-frame.
  ...latest
}, isSVGTag3, transformTemplate) {
  buildHTMLStyles(state, latest, transformTemplate);
  if (isSVGTag3) {
    if (state.style.viewBox) {
      state.attrs.viewBox = state.style.viewBox;
    }
    return;
  }
  state.attrs = state.style;
  state.style = {};
  const { attrs, style } = state;
  if (attrs.transform) {
    style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (style.transform || attrs.transformOrigin) {
    style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
    delete attrs.transformOrigin;
  }
  if (style.transform) {
    style.transformBox = "fill-box";
    delete attrs.transformBox;
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (attrScale !== void 0)
    attrs.scale = attrScale;
  if (pathLength !== void 0) {
    buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}

// node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs
var createSvgRenderState = () => ({
  ...createHtmlRenderState(),
  attrs: {}
});

// node_modules/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs
var isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";

// node_modules/framer-motion/dist/es/render/svg/use-props.mjs
function useSVGProps(props, visualState, _isStatic, Component3) {
  const visualProps = (0, import_react16.useMemo)(() => {
    const state = createSvgRenderState();
    buildSVGAttrs(state, visualState, isSVGTag(Component3), props.transformTemplate);
    return {
      ...state.attrs,
      style: { ...state.style }
    };
  }, [visualState]);
  if (props.style) {
    const rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props);
    visualProps.style = { ...rawStyles, ...visualProps.style };
  }
  return visualProps;
}

// node_modules/framer-motion/dist/es/render/dom/use-render.mjs
function createUseRender(forwardMotionProps = false) {
  const useRender = (Component3, props, ref, { latestValues }, isStatic) => {
    const useVisualProps = isSVGComponent(Component3) ? useSVGProps : useHTMLProps;
    const visualProps = useVisualProps(props, latestValues, isStatic, Component3);
    const filteredProps = filterProps(props, typeof Component3 === "string", forwardMotionProps);
    const elementProps = Component3 !== import_react17.Fragment ? { ...filteredProps, ...visualProps, ref } : {};
    const { children } = props;
    const renderedChildren = (0, import_react17.useMemo)(() => isMotionValue(children) ? children.get() : children, [children]);
    return (0, import_react17.createElement)(Component3, {
      ...elementProps,
      children: renderedChildren
    });
  };
  return useRender;
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
var import_react18 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs
function getValueState(visualElement) {
  const state = [{}, {}];
  visualElement?.values.forEach((value, key) => {
    state[0][key] = value.get();
    state[1][key] = value.getVelocity();
  });
  return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
  if (typeof definition === "function") {
    const [current, velocity] = getValueState(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
  }
  if (typeof definition === "string") {
    definition = props.variants && props.variants[definition];
  }
  if (typeof definition === "function") {
    const [current, velocity] = getValueState(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
  }
  return definition;
}

// node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs
function resolveMotionValue(value) {
  return isMotionValue(value) ? value.get() : value;
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps5, createRenderState }, props, context, presenceContext) {
  const state = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps5),
    renderState: createRenderState()
  };
  return state;
}
var makeUseVisualState = (config) => (props, isStatic) => {
  const context = (0, import_react18.useContext)(MotionContext);
  const presenceContext = (0, import_react18.useContext)(PresenceContext);
  const make = () => makeState(config, props, context, presenceContext);
  return isStatic ? make() : useConstant(make);
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  const values = {};
  const motionValues = scrapeMotionValues(props, {});
  for (const key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }
  let { initial, animate } = props;
  const isControllingVariants$1 = isControllingVariants(props);
  const isVariantNode$1 = isVariantNode(props);
  if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
    if (initial === void 0)
      initial = context.initial;
    if (animate === void 0)
      animate = context.animate;
  }
  let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
  isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
  const variantToSet = isInitialAnimationBlocked ? animate : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    for (let i = 0; i < list.length; i++) {
      const resolved = resolveVariantFromProps(props, list[i]);
      if (resolved) {
        const { transitionEnd, transition, ...target } = resolved;
        for (const key in target) {
          let valueTarget = target[key];
          if (Array.isArray(valueTarget)) {
            const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
            valueTarget = valueTarget[index];
          }
          if (valueTarget !== null) {
            values[key] = valueTarget;
          }
        }
        for (const key in transitionEnd) {
          values[key] = transitionEnd[key];
        }
      }
    }
  }
  return values;
}

// node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
  const { style } = props;
  const newValues = {};
  for (const key in style) {
    if (isMotionValue(style[key]) || prevProps.style && isMotionValue(prevProps.style[key]) || isForcedMotionValue(key, props) || visualElement?.getValue(key)?.liveStyle !== void 0) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}

// node_modules/framer-motion/dist/es/render/html/config-motion.mjs
var htmlMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps,
    createRenderState: createHtmlRenderState
  })
};

// node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps2(props, prevProps, visualElement) {
  const newValues = scrapeMotionValuesFromProps(props, prevProps, visualElement);
  for (const key in props) {
    if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
      const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}

// node_modules/framer-motion/dist/es/render/svg/config-motion.mjs
var svgMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2,
    createRenderState: createSvgRenderState
  })
};

// node_modules/framer-motion/dist/es/render/components/create-factory.mjs
function createMotionComponentFactory(preloadedFeatures, createVisualElement) {
  return function createMotionComponent3(Component3, { forwardMotionProps } = { forwardMotionProps: false }) {
    const baseConfig = isSVGComponent(Component3) ? svgMotionConfig : htmlMotionConfig;
    const config = {
      ...baseConfig,
      preloadedFeatures,
      useRender: createUseRender(forwardMotionProps),
      createVisualElement,
      Component: Component3
    };
    return createRendererMotionComponent(config);
  };
}

// node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs
function resolveVariant(visualElement, definition, custom) {
  const props = visualElement.getProps();
  return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, visualElement);
}

// node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs
var isKeyframesTarget = (v) => {
  return Array.isArray(v);
};

// node_modules/framer-motion/dist/es/render/utils/setters.mjs
function setMotionValue(visualElement, key, value) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key).set(value);
  } else {
    visualElement.addValue(key, motionValue(value));
  }
}
function resolveFinalValueInKeyframes(v) {
  return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
}
function setTarget(visualElement, definition) {
  const resolved = resolveVariant(visualElement, definition);
  let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
  target = { ...target, ...transitionEnd };
  for (const key in target) {
    const value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement, key, value);
  }
}

// node_modules/framer-motion/dist/es/value/use-will-change/is.mjs
function isWillChangeMotionValue(value) {
  return Boolean(isMotionValue(value) && value.add);
}

// node_modules/framer-motion/dist/es/value/use-will-change/add-will-change.mjs
function addValueToWillChange(visualElement, key) {
  const willChange = visualElement.getValue("willChange");
  if (isWillChangeMotionValue(willChange)) {
    return willChange.add(key);
  } else if (!willChange && MotionGlobalConfig.WillChange) {
    const newWillChange = new MotionGlobalConfig.WillChange("auto");
    visualElement.addValue("willChange", newWillChange);
    newWillChange.add(key);
  }
}

// node_modules/framer-motion/dist/es/animation/optimized-appear/get-appear-id.mjs
function getOptimisedAppearId(visualElement) {
  return visualElement.props[optimizedAppearDataAttribute];
}

// node_modules/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs
var isNotNull2 = (value) => value !== null;
function getFinalKeyframe2(keyframes3, { repeat, repeatType = "loop" }, finalKeyframe) {
  const resolvedKeyframes = keyframes3.filter(isNotNull2);
  const index = repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : resolvedKeyframes.length - 1;
  return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}

// node_modules/framer-motion/dist/es/animation/utils/default-transitions.mjs
var underDampedSpring = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
};
var criticallyDampedSpring = (target) => ({
  type: "spring",
  stiffness: 550,
  damping: target === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
});
var keyframesTransition = {
  type: "keyframes",
  duration: 0.8
};
var ease = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
};
var getDefaultTransition = (valueKey, { keyframes: keyframes3 }) => {
  if (keyframes3.length > 2) {
    return keyframesTransition;
  } else if (transformProps.has(valueKey)) {
    return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes3[1]) : underDampedSpring;
  }
  return ease;
};

// node_modules/framer-motion/dist/es/animation/utils/is-transition-defined.mjs
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed, ...transition }) {
  return !!Object.keys(transition).length;
}

// node_modules/framer-motion/dist/es/animation/interfaces/motion-value.mjs
var animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
  const valueTransition = getValueTransition(transition, name) || {};
  const delay3 = valueTransition.delay || transition.delay || 0;
  let { elapsed = 0 } = transition;
  elapsed = elapsed - secondsToMilliseconds(delay3);
  const options = {
    keyframes: Array.isArray(target) ? target : [null, target],
    ease: "easeOut",
    velocity: value.getVelocity(),
    ...valueTransition,
    delay: -elapsed,
    onUpdate: (v) => {
      value.set(v);
      valueTransition.onUpdate && valueTransition.onUpdate(v);
    },
    onComplete: () => {
      onComplete();
      valueTransition.onComplete && valueTransition.onComplete();
    },
    name,
    motionValue: value,
    element: isHandoff ? void 0 : element
  };
  if (!isTransitionDefined(valueTransition)) {
    Object.assign(options, getDefaultTransition(name, options));
  }
  options.duration && (options.duration = secondsToMilliseconds(options.duration));
  options.repeatDelay && (options.repeatDelay = secondsToMilliseconds(options.repeatDelay));
  if (options.from !== void 0) {
    options.keyframes[0] = options.from;
  }
  let shouldSkip = false;
  if (options.type === false || options.duration === 0 && !options.repeatDelay) {
    options.duration = 0;
    if (options.delay === 0) {
      shouldSkip = true;
    }
  }
  if (MotionGlobalConfig.instantAnimations || MotionGlobalConfig.skipAnimations) {
    shouldSkip = true;
    options.duration = 0;
    options.delay = 0;
  }
  options.allowFlatten = !valueTransition.type && !valueTransition.ease;
  if (shouldSkip && !isHandoff && value.get() !== void 0) {
    const finalKeyframe = getFinalKeyframe2(options.keyframes, valueTransition);
    if (finalKeyframe !== void 0) {
      frame.update(() => {
        options.onUpdate(finalKeyframe);
        options.onComplete();
      });
      return;
    }
  }
  return new AsyncMotionValueAnimation(options);
};

// node_modules/framer-motion/dist/es/animation/interfaces/visual-element-target.mjs
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay: delay3 = 0, transitionOverride, type } = {}) {
  let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = targetAndTransition;
  if (transitionOverride)
    transition = transitionOverride;
  const animations3 = [];
  const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
  for (const key in target) {
    const value = visualElement.getValue(key, visualElement.latestValues[key] ?? null);
    const valueTarget = target[key];
    if (valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    const valueTransition = {
      delay: delay3,
      ...getValueTransition(transition || {}, key)
    };
    const currentValue = value.get();
    if (currentValue !== void 0 && !value.isAnimating && !Array.isArray(valueTarget) && valueTarget === currentValue && !valueTransition.velocity) {
      continue;
    }
    let isHandoff = false;
    if (window.MotionHandoffAnimation) {
      const appearId = getOptimisedAppearId(visualElement);
      if (appearId) {
        const startTime = window.MotionHandoffAnimation(appearId, key, frame);
        if (startTime !== null) {
          valueTransition.startTime = startTime;
          isHandoff = true;
        }
      }
    }
    addValueToWillChange(visualElement, key);
    value.start(animateMotionValue(key, value, valueTarget, visualElement.shouldReduceMotion && positionalKeys.has(key) ? { type: false } : valueTransition, visualElement, isHandoff));
    const animation = value.animation;
    if (animation) {
      animations3.push(animation);
    }
  }
  if (transitionEnd) {
    Promise.all(animations3).then(() => {
      frame.update(() => {
        transitionEnd && setTarget(visualElement, transitionEnd);
      });
    });
  }
  return animations3;
}

// node_modules/framer-motion/dist/es/animation/interfaces/visual-element-variant.mjs
function animateVariant(visualElement, variant, options = {}) {
  const resolved = resolveVariant(visualElement, variant, options.type === "exit" ? visualElement.presenceContext?.custom : void 0);
  let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
  if (options.transitionOverride) {
    transition = options.transitionOverride;
  }
  const getAnimation = resolved ? () => Promise.all(animateTarget(visualElement, resolved, options)) : () => Promise.resolve();
  const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0) => {
    const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
    return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
  } : () => Promise.resolve();
  const { when } = transition;
  if (when) {
    const [first, last] = when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation];
    return first().then(() => last());
  } else {
    return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
  }
}
function animateChildren(visualElement, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
  const animations3 = [];
  const maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
  const generateStaggerDuration = staggerDirection === 1 ? (i = 0) => i * staggerChildren : (i = 0) => maxStaggerDuration - i * staggerChildren;
  Array.from(visualElement.variantChildren).sort(sortByTreeOrder).forEach((child, i) => {
    child.notify("AnimationStart", variant);
    animations3.push(animateVariant(child, variant, {
      ...options,
      delay: delayChildren + generateStaggerDuration(i)
    }).then(() => child.notify("AnimationComplete", variant)));
  });
  return Promise.all(animations3);
}
function sortByTreeOrder(a, b) {
  return a.sortNodePosition(b);
}

// node_modules/framer-motion/dist/es/animation/interfaces/visual-element.mjs
function animateVisualElement(visualElement, definition, options = {}) {
  visualElement.notify("AnimationStart", definition);
  let animation;
  if (Array.isArray(definition)) {
    const animations3 = definition.map((variant) => animateVariant(visualElement, variant, options));
    animation = Promise.all(animations3);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement, definition, options);
  } else {
    const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
    animation = Promise.all(animateTarget(visualElement, resolvedDefinition, options));
  }
  return animation.then(() => {
    visualElement.notify("AnimationComplete", definition);
  });
}

// node_modules/framer-motion/dist/es/utils/shallow-compare.mjs
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  const prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (let i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i])
      return false;
  }
  return true;
}

// node_modules/framer-motion/dist/es/render/utils/get-variant-context.mjs
var numVariantProps = variantProps.length;
function getVariantContext(visualElement) {
  if (!visualElement)
    return void 0;
  if (!visualElement.isControllingVariants) {
    const context2 = visualElement.parent ? getVariantContext(visualElement.parent) || {} : {};
    if (visualElement.props.initial !== void 0) {
      context2.initial = visualElement.props.initial;
    }
    return context2;
  }
  const context = {};
  for (let i = 0; i < numVariantProps; i++) {
    const name = variantProps[i];
    const prop = visualElement.props[name];
    if (isVariantLabel(prop) || prop === false) {
      context[name] = prop;
    }
  }
  return context;
}

// node_modules/framer-motion/dist/es/render/utils/animation-state.mjs
var reversePriorityOrder = [...variantPriorityOrder].reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement) {
  return (animations3) => Promise.all(animations3.map(({ animation, options }) => animateVisualElement(visualElement, animation, options)));
}
function createAnimationState(visualElement) {
  let animate = animateList(visualElement);
  let state = createState();
  let isInitialRender = true;
  const buildResolvedTypeValues = (type) => (acc, definition) => {
    const resolved = resolveVariant(visualElement, definition, type === "exit" ? visualElement.presenceContext?.custom : void 0);
    if (resolved) {
      const { transition, transitionEnd, ...target } = resolved;
      acc = { ...acc, ...target, ...transitionEnd };
    }
    return acc;
  };
  function setAnimateFunction(makeAnimator) {
    animate = makeAnimator(visualElement);
  }
  function animateChanges(changedActiveType) {
    const { props } = visualElement;
    const context = getVariantContext(visualElement.parent) || {};
    const animations3 = [];
    const removedKeys = /* @__PURE__ */ new Set();
    let encounteredKeys = {};
    let removedVariantIndex = Infinity;
    for (let i = 0; i < numAnimationTypes; i++) {
      const type = reversePriorityOrder[i];
      const typeState = state[type];
      const prop = props[type] !== void 0 ? props[type] : context[type];
      const propIsVariant = isVariantLabel(prop);
      const activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i;
      let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = { ...encounteredKeys };
      if (
        // If it isn't active and hasn't *just* been set as inactive
        !typeState.isActive && activeDelta === null || // If we didn't and don't have any defined prop for this animation type
        !prop && !typeState.prevProp || // Or if the prop doesn't define an animation
        isAnimationControls(prop) || typeof prop === "boolean"
      ) {
        continue;
      }
      const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
      let shouldAnimateType = variantDidChange || // If we're making this variant active, we want to always make it active
      type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || // If we removed a higher-priority variant (i is in reverse order)
      i > removedVariantIndex && propIsVariant;
      let handledRemovedValues = false;
      const definitionList = Array.isArray(prop) ? prop : [prop];
      let resolvedValues = definitionList.reduce(buildResolvedTypeValues(type), {});
      if (activeDelta === false)
        resolvedValues = {};
      const { prevResolvedValues = {} } = typeState;
      const allKeys = {
        ...prevResolvedValues,
        ...resolvedValues
      };
      const markToAnimate = (key) => {
        shouldAnimateType = true;
        if (removedKeys.has(key)) {
          handledRemovedValues = true;
          removedKeys.delete(key);
        }
        typeState.needsAnimating[key] = true;
        const motionValue3 = visualElement.getValue(key);
        if (motionValue3)
          motionValue3.liveStyle = false;
      };
      for (const key in allKeys) {
        const next = resolvedValues[key];
        const prev = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        let valueHasChanged = false;
        if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
          valueHasChanged = !shallowCompare(next, prev);
        } else {
          valueHasChanged = next !== prev;
        }
        if (valueHasChanged) {
          if (next !== void 0 && next !== null) {
            markToAnimate(key);
          } else {
            removedKeys.add(key);
          }
        } else if (next !== void 0 && removedKeys.has(key)) {
          markToAnimate(key);
        } else {
          typeState.protectedKeys[key] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = { ...encounteredKeys, ...resolvedValues };
      }
      if (isInitialRender && visualElement.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      const willAnimateViaParent = isInherited && variantDidChange;
      const needsAnimating = !willAnimateViaParent || handledRemovedValues;
      if (shouldAnimateType && needsAnimating) {
        animations3.push(...definitionList.map((animation) => ({
          animation,
          options: { type }
        })));
      }
    }
    if (removedKeys.size) {
      const fallbackAnimation = {};
      if (typeof props.initial !== "boolean") {
        const initialTransition = resolveVariant(visualElement, Array.isArray(props.initial) ? props.initial[0] : props.initial);
        if (initialTransition && initialTransition.transition) {
          fallbackAnimation.transition = initialTransition.transition;
        }
      }
      removedKeys.forEach((key) => {
        const fallbackTarget = visualElement.getBaseTarget(key);
        const motionValue3 = visualElement.getValue(key);
        if (motionValue3)
          motionValue3.liveStyle = true;
        fallbackAnimation[key] = fallbackTarget ?? null;
      });
      animations3.push({ animation: fallbackAnimation });
    }
    let shouldAnimate = Boolean(animations3.length);
    if (isInitialRender && (props.initial === false || props.initial === props.animate) && !visualElement.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate(animations3) : Promise.resolve();
  }
  function setActive(type, isActive) {
    if (state[type].isActive === isActive)
      return Promise.resolve();
    visualElement.variantChildren?.forEach((child) => child.animationState?.setActive(type, isActive));
    state[type].isActive = isActive;
    const animations3 = animateChanges(type);
    for (const key in state) {
      state[key].protectedKeys = {};
    }
    return animations3;
  }
  return {
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: () => state,
    reset: () => {
      state = createState();
      isInitialRender = true;
    }
  };
}
function checkVariantsDidChange(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (Array.isArray(next)) {
    return !shallowCompare(next, prev);
  }
  return false;
}
function createTypeState(isActive = false) {
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  return {
    animate: createTypeState(true),
    whileInView: createTypeState(),
    whileHover: createTypeState(),
    whileTap: createTypeState(),
    whileDrag: createTypeState(),
    whileFocus: createTypeState(),
    exit: createTypeState()
  };
}

// node_modules/framer-motion/dist/es/motion/features/Feature.mjs
var Feature = class {
  constructor(node) {
    this.isMounted = false;
    this.node = node;
  }
  update() {
  }
};

// node_modules/framer-motion/dist/es/motion/features/animation/index.mjs
var AnimationFeature = class extends Feature {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(node) {
    super(node);
    node.animationState || (node.animationState = createAnimationState(node));
  }
  updateAnimationControlsSubscription() {
    const { animate } = this.node.getProps();
    if (isAnimationControls(animate)) {
      this.unmountControls = animate.subscribe(this.node);
    }
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate } = this.node.getProps();
    const { animate: prevAnimate } = this.node.prevProps || {};
    if (animate !== prevAnimate) {
      this.updateAnimationControlsSubscription();
    }
  }
  unmount() {
    this.node.animationState.reset();
    this.unmountControls?.();
  }
};

// node_modules/framer-motion/dist/es/motion/features/animation/exit.mjs
var id = 0;
var ExitAnimationFeature = class extends Feature {
  constructor() {
    super(...arguments);
    this.id = id++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent, onExitComplete } = this.node.presenceContext;
    const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || isPresent === prevIsPresent) {
      return;
    }
    const exitAnimation = this.node.animationState.setActive("exit", !isPresent);
    if (onExitComplete && !isPresent) {
      exitAnimation.then(() => {
        onExitComplete(this.id);
      });
    }
  }
  mount() {
    const { register, onExitComplete } = this.node.presenceContext || {};
    if (onExitComplete) {
      onExitComplete(this.id);
    }
    if (register) {
      this.unmount = register(this.id);
    }
  }
  unmount() {
  }
};

// node_modules/framer-motion/dist/es/motion/features/animations.mjs
var animations = {
  animation: {
    Feature: AnimationFeature
  },
  exit: {
    Feature: ExitAnimationFeature
  }
};

// node_modules/framer-motion/dist/es/events/add-dom-event.mjs
function addDomEvent(target, eventName, handler, options = { passive: true }) {
  target.addEventListener(eventName, handler, options);
  return () => target.removeEventListener(eventName, handler);
}

// node_modules/framer-motion/dist/es/events/event-info.mjs
function extractEventInfo(event) {
  return {
    point: {
      x: event.pageX,
      y: event.pageY
    }
  };
}
var addPointerInfo = (handler) => {
  return (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
};

// node_modules/framer-motion/dist/es/events/add-pointer-event.mjs
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, eventName, addPointerInfo(handler), options);
}

// node_modules/framer-motion/dist/es/projection/geometry/conversion.mjs
function convertBoundingBoxToBox({ top, left, right, bottom }) {
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function convertBoxToBoundingBox({ x, y }) {
  return { top: y.min, right: x.max, bottom: y.max, left: x.min };
}
function transformBoxPoints(point, transformPoint3) {
  if (!transformPoint3)
    return point;
  const topLeft = transformPoint3({ x: point.left, y: point.top });
  const bottomRight = transformPoint3({ x: point.right, y: point.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}

// node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs
var SCALE_PRECISION = 1e-4;
var SCALE_MIN = 1 - SCALE_PRECISION;
var SCALE_MAX = 1 + SCALE_PRECISION;
var TRANSLATE_PRECISION = 0.01;
var TRANSLATE_MIN = 0 - TRANSLATE_PRECISION;
var TRANSLATE_MAX = 0 + TRANSLATE_PRECISION;
function calcLength(axis) {
  return axis.max - axis.min;
}
function isNear(value, target, maxDistance) {
  return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = 0.5) {
  delta.origin = origin;
  delta.originPoint = mixNumber(source.min, source.max, delta.origin);
  delta.scale = calcLength(target) / calcLength(source);
  delta.translate = mixNumber(target.min, target.max, delta.origin) - delta.originPoint;
  if (delta.scale >= SCALE_MIN && delta.scale <= SCALE_MAX || isNaN(delta.scale)) {
    delta.scale = 1;
  }
  if (delta.translate >= TRANSLATE_MIN && delta.translate <= TRANSLATE_MAX || isNaN(delta.translate)) {
    delta.translate = 0;
  }
}
function calcBoxDelta(delta, source, target, origin) {
  calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : void 0);
  calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : void 0);
}
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent) {
  calcRelativeAxis(target.x, relative.x, parent.x);
  calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout3, parent) {
  target.min = layout3.min - parent.min;
  target.max = target.min + calcLength(layout3);
}
function calcRelativePosition(target, layout3, parent) {
  calcRelativeAxisPosition(target.x, layout3.x, parent.x);
  calcRelativeAxisPosition(target.y, layout3.y, parent.y);
}

// node_modules/framer-motion/dist/es/projection/geometry/models.mjs
var createAxisDelta = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
});
var createDelta = () => ({
  x: createAxisDelta(),
  y: createAxisDelta()
});
var createAxis = () => ({ min: 0, max: 0 });
var createBox = () => ({
  x: createAxis(),
  y: createAxis()
});

// node_modules/framer-motion/dist/es/projection/utils/each-axis.mjs
function eachAxis(callback) {
  return [callback("x"), callback("y")];
}

// node_modules/framer-motion/dist/es/projection/utils/has-transform.mjs
function isIdentityScale(scale3) {
  return scale3 === void 0 || scale3 === 1;
}
function hasScale({ scale: scale3, scaleX: scaleX3, scaleY: scaleY3 }) {
  return !isIdentityScale(scale3) || !isIdentityScale(scaleX3) || !isIdentityScale(scaleY3);
}
function hasTransform(values) {
  return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY || values.skewX || values.skewY;
}
function has2DTranslate(values) {
  return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
  return value && value !== "0%";
}

// node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs
function scalePoint(point, scale3, originPoint) {
  const distanceFromOrigin = point - originPoint;
  const scaled = scale3 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point, translate, scale3, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point = scalePoint(point, boxScale, originPoint);
  }
  return scalePoint(point, scale3, originPoint) + translate;
}
function applyAxisDelta(axis, translate = 0, scale3 = 1, originPoint, boxScale) {
  axis.min = applyPointDelta(axis.min, translate, scale3, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale3, originPoint, boxScale);
}
function applyBoxDelta(box, { x, y }) {
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
var TREE_SCALE_SNAP_MIN = 0.999999999999;
var TREE_SCALE_SNAP_MAX = 1.0000000000001;
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
  const treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  let node;
  let delta;
  for (let i = 0; i < treeLength; i++) {
    node = treePath[i];
    delta = node.projectionDelta;
    const { visualElement } = node.options;
    if (visualElement && visualElement.props.style && visualElement.props.style.display === "contents") {
      continue;
    }
    if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
      transformBox(box, {
        x: -node.scroll.offset.x,
        y: -node.scroll.offset.y
      });
    }
    if (delta) {
      treeScale.x *= delta.x.scale;
      treeScale.y *= delta.y.scale;
      applyBoxDelta(box, delta);
    }
    if (isSharedTransition && hasTransform(node.latestValues)) {
      transformBox(box, node.latestValues);
    }
  }
  if (treeScale.x < TREE_SCALE_SNAP_MAX && treeScale.x > TREE_SCALE_SNAP_MIN) {
    treeScale.x = 1;
  }
  if (treeScale.y < TREE_SCALE_SNAP_MAX && treeScale.y > TREE_SCALE_SNAP_MIN) {
    treeScale.y = 1;
  }
}
function translateAxis(axis, distance3) {
  axis.min = axis.min + distance3;
  axis.max = axis.max + distance3;
}
function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = 0.5) {
  const originPoint = mixNumber(axis.min, axis.max, axisOrigin);
  applyAxisDelta(axis, axisTranslate, axisScale, originPoint, boxScale);
}
function transformBox(box, transform) {
  transformAxis(box.x, transform.x, transform.scaleX, transform.scale, transform.originX);
  transformAxis(box.y, transform.y, transform.scaleY, transform.scale, transform.originY);
}

// node_modules/framer-motion/dist/es/projection/utils/measure.mjs
function measureViewportBox(instance, transformPoint3) {
  return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint3));
}
function measurePageBox(element, rootProjectionNode3, transformPagePoint) {
  const viewportBox = measureViewportBox(element, transformPagePoint);
  const { scroll } = rootProjectionNode3;
  if (scroll) {
    translateAxis(viewportBox.x, scroll.offset.x);
    translateAxis(viewportBox.y, scroll.offset.y);
  }
  return viewportBox;
}

// node_modules/framer-motion/dist/es/utils/get-context-window.mjs
var getContextWindow = ({ current }) => {
  return current ? current.ownerDocument.defaultView : null;
};

// node_modules/framer-motion/dist/es/utils/distance.mjs
var distance = (a, b) => Math.abs(a - b);
function distance2D(a, b) {
  const xDelta = distance(a.x, b.x);
  const yDelta = distance(a.y, b.y);
  return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}

// node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs
var PanSession = class {
  constructor(event, handlers, { transformPagePoint, contextWindow, dragSnapToOrigin = false } = {}) {
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.contextWindow = window;
    this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const info2 = getPanInfo(this.lastMoveEventInfo, this.history);
      const isPanStarted = this.startEvent !== null;
      const isDistancePastThreshold = distance2D(info2.offset, { x: 0, y: 0 }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      const { point: point2 } = info2;
      const { timestamp: timestamp2 } = frameData;
      this.history.push({ ...point2, timestamp: timestamp2 });
      const { onStart, onMove } = this.handlers;
      if (!isPanStarted) {
        onStart && onStart(this.lastMoveEvent, info2);
        this.startEvent = this.lastMoveEvent;
      }
      onMove && onMove(this.lastMoveEvent, info2);
    };
    this.handlePointerMove = (event2, info2) => {
      this.lastMoveEvent = event2;
      this.lastMoveEventInfo = transformPoint(info2, this.transformPagePoint);
      frame.update(this.updatePoint, true);
    };
    this.handlePointerUp = (event2, info2) => {
      this.end();
      const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
      if (this.dragSnapToOrigin)
        resumeAnimation && resumeAnimation();
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const panInfo = getPanInfo(event2.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info2, this.transformPagePoint), this.history);
      if (this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (!isPrimaryPointer(event))
      return;
    this.dragSnapToOrigin = dragSnapToOrigin;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    this.contextWindow = contextWindow || window;
    const info = extractEventInfo(event);
    const initialInfo = transformPoint(info, this.transformPagePoint);
    const { point } = initialInfo;
    const { timestamp } = frameData;
    this.history = [{ ...point, timestamp }];
    const { onSessionStart } = handlers;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(handlers) {
    this.handlers = handlers;
  }
  end() {
    this.removeListeners && this.removeListeners();
    cancelFrame(this.updatePoint);
  }
};
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}
function getPanInfo({ point }, history) {
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  let i = history.length - 1;
  let timestampedPoint = null;
  const lastPoint = lastDevicePoint(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  const time3 = millisecondsToSeconds(lastPoint.timestamp - timestampedPoint.timestamp);
  if (time3 === 0) {
    return { x: 0, y: 0 };
  }
  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time3,
    y: (lastPoint.y - timestampedPoint.y) / time3
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}

// node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
function applyConstraints(point, { min, max }, elastic) {
  if (min !== void 0 && point < min) {
    point = elastic ? mixNumber(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== void 0 && point > max) {
    point = elastic ? mixNumber(max, point, elastic.max) : Math.min(point, max);
  }
  return point;
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  let min = constraintsAxis.min - layoutAxis.min;
  let max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    [min, max] = [max, min];
  }
  return { min, max };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcOrigin(source, target) {
  let origin = 0.5;
  const sourceLength = calcLength(source);
  const targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clamp(0, 1, origin);
}
function rebaseAxisConstraints(layout3, constraints) {
  const relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout3.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout3.min;
  }
  return relativeConstraints;
}
var defaultElastic = 0.35;
function resolveDragElastic(dragElastic = defaultElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}

// node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
var elementDragControls = /* @__PURE__ */ new WeakMap();
var VisualElementDragControls = class {
  constructor(visualElement) {
    this.openDragLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = { x: 0, y: 0 };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox();
    this.visualElement = visualElement;
  }
  start(originEvent, { snapToCursor = false } = {}) {
    const { presenceContext } = this.visualElement;
    if (presenceContext && presenceContext.isPresent === false)
      return;
    const onSessionStart = (event) => {
      const { dragSnapToOrigin: dragSnapToOrigin2 } = this.getProps();
      dragSnapToOrigin2 ? this.pauseAnimation() : this.stopAnimation();
      if (snapToCursor) {
        this.snapToCursor(extractEventInfo(event).point);
      }
    };
    const onStart = (event, info) => {
      const { drag: drag3, dragPropagation, onDragStart } = this.getProps();
      if (drag3 && !dragPropagation) {
        if (this.openDragLock)
          this.openDragLock();
        this.openDragLock = setDragLock(drag3);
        if (!this.openDragLock)
          return;
      }
      this.isDragging = true;
      this.currentDirection = null;
      this.resolveConstraints();
      if (this.visualElement.projection) {
        this.visualElement.projection.isAnimationBlocked = true;
        this.visualElement.projection.target = void 0;
      }
      eachAxis((axis) => {
        let current = this.getAxisMotionValue(axis).get() || 0;
        if (percent.test(current)) {
          const { projection } = this.visualElement;
          if (projection && projection.layout) {
            const measuredAxis = projection.layout.layoutBox[axis];
            if (measuredAxis) {
              const length = calcLength(measuredAxis);
              current = length * (parseFloat(current) / 100);
            }
          }
        }
        this.originPoint[axis] = current;
      });
      if (onDragStart) {
        frame.postRender(() => onDragStart(event, info));
      }
      addValueToWillChange(this.visualElement, "transform");
      const { animationState } = this.visualElement;
      animationState && animationState.setActive("whileDrag", true);
    };
    const onMove = (event, info) => {
      const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
      if (!dragPropagation && !this.openDragLock)
        return;
      const { offset } = info;
      if (dragDirectionLock && this.currentDirection === null) {
        this.currentDirection = getCurrentDirection(offset);
        if (this.currentDirection !== null) {
          onDirectionLock && onDirectionLock(this.currentDirection);
        }
        return;
      }
      this.updateAxis("x", info.point, offset);
      this.updateAxis("y", info.point, offset);
      this.visualElement.render();
      onDrag && onDrag(event, info);
    };
    const onSessionEnd = (event, info) => this.stop(event, info);
    const resumeAnimation = () => eachAxis((axis) => this.getAnimationState(axis) === "paused" && this.getAxisMotionValue(axis).animation?.play());
    const { dragSnapToOrigin } = this.getProps();
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd,
      resumeAnimation
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin,
      contextWindow: getContextWindow(this.visualElement)
    });
  }
  stop(event, info) {
    const isDragging3 = this.isDragging;
    this.cancel();
    if (!isDragging3)
      return;
    const { velocity } = info;
    this.startAnimation(velocity);
    const { onDragEnd } = this.getProps();
    if (onDragEnd) {
      frame.postRender(() => onDragEnd(event, info));
    }
  }
  cancel() {
    this.isDragging = false;
    const { projection, animationState } = this.visualElement;
    if (projection) {
      projection.isAnimationBlocked = false;
    }
    this.panSession && this.panSession.end();
    this.panSession = void 0;
    const { dragPropagation } = this.getProps();
    if (!dragPropagation && this.openDragLock) {
      this.openDragLock();
      this.openDragLock = null;
    }
    animationState && animationState.setActive("whileDrag", false);
  }
  updateAxis(axis, _point, offset) {
    const { drag: drag3 } = this.getProps();
    if (!offset || !shouldDrag(axis, drag3, this.currentDirection))
      return;
    const axisValue = this.getAxisMotionValue(axis);
    let next = this.originPoint[axis] + offset[axis];
    if (this.constraints && this.constraints[axis]) {
      next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
    }
    axisValue.set(next);
  }
  resolveConstraints() {
    const { dragConstraints, dragElastic } = this.getProps();
    const layout3 = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : this.visualElement.projection?.layout;
    const prevConstraints = this.constraints;
    if (dragConstraints && isRefObject(dragConstraints)) {
      if (!this.constraints) {
        this.constraints = this.resolveRefConstraints();
      }
    } else {
      if (dragConstraints && layout3) {
        this.constraints = calcRelativeConstraints(layout3.layoutBox, dragConstraints);
      } else {
        this.constraints = false;
      }
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (prevConstraints !== this.constraints && layout3 && this.constraints && !this.hasMutatedConstraints) {
      eachAxis((axis) => {
        if (this.constraints !== false && this.getAxisMotionValue(axis)) {
          this.constraints[axis] = rebaseAxisConstraints(layout3.layoutBox[axis], this.constraints[axis]);
        }
      });
    }
  }
  resolveRefConstraints() {
    const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
    if (!constraints || !isRefObject(constraints))
      return false;
    const constraintsElement = constraints.current;
    invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
    const { projection } = this.visualElement;
    if (!projection || !projection.layout)
      return false;
    const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
    let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
    if (onMeasureDragConstraints) {
      const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToBox(userConstraints);
      }
    }
    return measuredConstraints;
  }
  startAnimation(velocity) {
    const { drag: drag3, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
    const constraints = this.constraints || {};
    const momentumAnimations = eachAxis((axis) => {
      if (!shouldDrag(axis, drag3, this.currentDirection)) {
        return;
      }
      let transition = constraints && constraints[axis] || {};
      if (dragSnapToOrigin)
        transition = { min: 0, max: 0 };
      const bounceStiffness = dragElastic ? 200 : 1e6;
      const bounceDamping = dragElastic ? 40 : 1e7;
      const inertia3 = {
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...dragTransition,
        ...transition
      };
      return this.startAxisValueAnimation(axis, inertia3);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  }
  startAxisValueAnimation(axis, transition) {
    const axisValue = this.getAxisMotionValue(axis);
    addValueToWillChange(this.visualElement, axis);
    return axisValue.start(animateMotionValue(axis, axisValue, 0, transition, this.visualElement, false));
  }
  stopAnimation() {
    eachAxis((axis) => this.getAxisMotionValue(axis).stop());
  }
  pauseAnimation() {
    eachAxis((axis) => this.getAxisMotionValue(axis).animation?.pause());
  }
  getAnimationState(axis) {
    return this.getAxisMotionValue(axis).animation?.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(axis) {
    const dragKey = `_drag${axis.toUpperCase()}`;
    const props = this.visualElement.getProps();
    const externalMotionValue = props[dragKey];
    return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (props.initial ? props.initial[axis] : void 0) || 0);
  }
  snapToCursor(point) {
    eachAxis((axis) => {
      const { drag: drag3 } = this.getProps();
      if (!shouldDrag(axis, drag3, this.currentDirection))
        return;
      const { projection } = this.visualElement;
      const axisValue = this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        const { min, max } = projection.layout.layoutBox[axis];
        axisValue.set(point[axis] - mixNumber(min, max, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: drag3, dragConstraints } = this.getProps();
    const { projection } = this.visualElement;
    if (!isRefObject(dragConstraints) || !projection || !this.constraints)
      return;
    this.stopAnimation();
    const boxProgress = { x: 0, y: 0 };
    eachAxis((axis) => {
      const axisValue = this.getAxisMotionValue(axis);
      if (axisValue && this.constraints !== false) {
        const latest = axisValue.get();
        boxProgress[axis] = calcOrigin({ min: latest, max: latest }, this.constraints[axis]);
      }
    });
    const { transformTemplate } = this.visualElement.getProps();
    this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    projection.root && projection.root.updateScroll();
    projection.updateLayout();
    this.resolveConstraints();
    eachAxis((axis) => {
      if (!shouldDrag(axis, drag3, null))
        return;
      const axisValue = this.getAxisMotionValue(axis);
      const { min, max } = this.constraints[axis];
      axisValue.set(mixNumber(min, max, boxProgress[axis]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    elementDragControls.set(this.visualElement, this);
    const element = this.visualElement.current;
    const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
      const { drag: drag3, dragListener = true } = this.getProps();
      drag3 && dragListener && this.start(event);
    });
    const measureDragConstraints = () => {
      const { dragConstraints } = this.getProps();
      if (isRefObject(dragConstraints) && dragConstraints.current) {
        this.constraints = this.resolveRefConstraints();
      }
    };
    const { projection } = this.visualElement;
    const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
    if (projection && !projection.layout) {
      projection.root && projection.root.updateScroll();
      projection.updateLayout();
    }
    frame.read(measureDragConstraints);
    const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
    const stopLayoutUpdateListener = projection.addEventListener("didUpdate", ({ delta, hasLayoutChanged }) => {
      if (this.isDragging && hasLayoutChanged) {
        eachAxis((axis) => {
          const motionValue3 = this.getAxisMotionValue(axis);
          if (!motionValue3)
            return;
          this.originPoint[axis] += delta[axis].translate;
          motionValue3.set(motionValue3.get() + delta[axis].translate);
        });
        this.visualElement.render();
      }
    });
    return () => {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
      stopLayoutUpdateListener && stopLayoutUpdateListener();
    };
  }
  getProps() {
    const props = this.visualElement.getProps();
    const { drag: drag3 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
    return {
      ...props,
      drag: drag3,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    };
  }
};
function shouldDrag(direction, drag3, currentDirection) {
  return (drag3 === true || drag3 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold = 10) {
  let direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}

// node_modules/framer-motion/dist/es/gestures/drag/index.mjs
var DragGesture = class extends Feature {
  constructor(node) {
    super(node);
    this.removeGroupControls = noop;
    this.removeListeners = noop;
    this.controls = new VisualElementDragControls(node);
  }
  mount() {
    const { dragControls } = this.node.getProps();
    if (dragControls) {
      this.removeGroupControls = dragControls.subscribe(this.controls);
    }
    this.removeListeners = this.controls.addListeners() || noop;
  }
  unmount() {
    this.removeGroupControls();
    this.removeListeners();
  }
};

// node_modules/framer-motion/dist/es/gestures/pan/index.mjs
var asyncHandler = (handler) => (event, info) => {
  if (handler) {
    frame.postRender(() => handler(event, info));
  }
};
var PanGesture = class extends Feature {
  constructor() {
    super(...arguments);
    this.removePointerDownListener = noop;
  }
  onPointerDown(pointerDownEvent) {
    this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: getContextWindow(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
    return {
      onSessionStart: asyncHandler(onPanSessionStart),
      onStart: asyncHandler(onPanStart),
      onMove: onPan,
      onEnd: (event, info) => {
        delete this.session;
        if (onPanEnd) {
          frame.postRender(() => onPanEnd(event, info));
        }
      }
    };
  }
  mount() {
    this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener();
    this.session && this.session.end();
  }
};

// node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var import_react19 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/projection/node/state.mjs
var globalProjectionState = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: true,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: false
};

// node_modules/framer-motion/dist/es/projection/styles/scale-border-radius.mjs
function pixelsToPercent(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
var correctBorderRadius = {
  correct: (latest, node) => {
    if (!node.target)
      return latest;
    if (typeof latest === "string") {
      if (px.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    const x = pixelsToPercent(latest, node.target.x);
    const y = pixelsToPercent(latest, node.target.y);
    return `${x}% ${y}%`;
  }
};

// node_modules/framer-motion/dist/es/projection/styles/scale-box-shadow.mjs
var correctBoxShadow = {
  correct: (latest, { treeScale, projectionDelta }) => {
    const original = latest;
    const shadow = complex.parse(latest);
    if (shadow.length > 5)
      return original;
    const template = complex.createTransformer(latest);
    const offset = typeof shadow[0] !== "number" ? 1 : 0;
    const xScale = projectionDelta.x.scale * treeScale.x;
    const yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    const averageScale = mixNumber(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset] === "number")
      shadow[2 + offset] /= averageScale;
    if (typeof shadow[3 + offset] === "number")
      shadow[3 + offset] /= averageScale;
    return template(shadow);
  }
};

// node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
"use client";
var MeasureLayoutWithContext = class extends import_react19.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
    const { projection } = visualElement;
    addScaleCorrector(defaultScaleCorrectors);
    if (projection) {
      if (layoutGroup.group)
        layoutGroup.group.add(projection);
      if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
        switchLayoutGroup.register(projection);
      }
      projection.root.didUpdate();
      projection.addEventListener("animationComplete", () => {
        this.safeToRemove();
      });
      projection.setOptions({
        ...projection.options,
        onExitComplete: () => this.safeToRemove()
      });
    }
    globalProjectionState.hasEverUpdated = true;
  }
  getSnapshotBeforeUpdate(prevProps) {
    const { layoutDependency, visualElement, drag: drag3, isPresent } = this.props;
    const projection = visualElement.projection;
    if (!projection)
      return null;
    projection.isPresent = isPresent;
    if (drag3 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0 || prevProps.isPresent !== isPresent) {
      projection.willUpdate();
    } else {
      this.safeToRemove();
    }
    if (prevProps.isPresent !== isPresent) {
      if (isPresent) {
        projection.promote();
      } else if (!projection.relegate()) {
        frame.postRender(() => {
          const stack = projection.getStack();
          if (!stack || !stack.members.length) {
            this.safeToRemove();
          }
        });
      }
    }
    return null;
  }
  componentDidUpdate() {
    const { projection } = this.props.visualElement;
    if (projection) {
      projection.root.didUpdate();
      microtask.postRender(() => {
        if (!projection.currentAnimation && projection.isLead()) {
          this.safeToRemove();
        }
      });
    }
  }
  componentWillUnmount() {
    const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
    const { projection } = visualElement;
    if (projection) {
      projection.scheduleCheckAfterUnmount();
      if (layoutGroup && layoutGroup.group)
        layoutGroup.group.remove(projection);
      if (promoteContext && promoteContext.deregister)
        promoteContext.deregister(projection);
    }
  }
  safeToRemove() {
    const { safeToRemove } = this.props;
    safeToRemove && safeToRemove();
  }
  render() {
    return null;
  }
};
function MeasureLayout(props) {
  const [isPresent, safeToRemove] = usePresence();
  const layoutGroup = (0, import_react19.useContext)(LayoutGroupContext);
  return (0, import_jsx_runtime2.jsx)(MeasureLayoutWithContext, { ...props, layoutGroup, switchLayoutGroup: (0, import_react19.useContext)(SwitchLayoutGroupContext), isPresent, safeToRemove });
}
var defaultScaleCorrectors = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};

// node_modules/framer-motion/dist/es/animation/animate/single-value.mjs
function animateSingleValue(value, keyframes3, options) {
  const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
  motionValue$1.start(animateMotionValue("", motionValue$1, keyframes3, options));
  return motionValue$1.animation;
}

// node_modules/framer-motion/dist/es/render/dom/utils/is-svg-element.mjs
function isSVGElement(element) {
  return element instanceof SVGElement && element.tagName !== "svg";
}

// node_modules/framer-motion/dist/es/render/utils/compare-by-depth.mjs
var compareByDepth = (a, b) => a.depth - b.depth;

// node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs
var FlatTree = class {
  constructor() {
    this.children = [];
    this.isDirty = false;
  }
  add(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  }
  remove(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  }
  forEach(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  }
};

// node_modules/framer-motion/dist/es/utils/delay.mjs
function delay(callback, timeout) {
  const start = time.now();
  const checkElapsed = ({ timestamp }) => {
    const elapsed = timestamp - start;
    if (elapsed >= timeout) {
      cancelFrame(checkElapsed);
      callback(elapsed - timeout);
    }
  };
  frame.setup(checkElapsed, true);
  return () => cancelFrame(checkElapsed);
}

// node_modules/framer-motion/dist/es/projection/animation/mix-values.mjs
var borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
var numBorders = borders.length;
var asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
var isPx = (value) => typeof value === "number" || px.test(value);
function mixValues(target, follow, lead, progress3, shouldCrossfadeOpacity, isOnlyMember) {
  if (shouldCrossfadeOpacity) {
    target.opacity = mixNumber(0, lead.opacity ?? 1, easeCrossfadeIn(progress3));
    target.opacityExit = mixNumber(follow.opacity ?? 1, 0, easeCrossfadeOut(progress3));
  } else if (isOnlyMember) {
    target.opacity = mixNumber(follow.opacity ?? 1, lead.opacity ?? 1, progress3);
  }
  for (let i = 0; i < numBorders; i++) {
    const borderLabel = `border${borders[i]}Radius`;
    let followRadius = getRadius(follow, borderLabel);
    let leadRadius = getRadius(lead, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0)
      continue;
    followRadius || (followRadius = 0);
    leadRadius || (leadRadius = 0);
    const canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
    if (canMix) {
      target[borderLabel] = Math.max(mixNumber(asNumber(followRadius), asNumber(leadRadius), progress3), 0);
      if (percent.test(leadRadius) || percent.test(followRadius)) {
        target[borderLabel] += "%";
      }
    } else {
      target[borderLabel] = leadRadius;
    }
  }
  if (follow.rotate || lead.rotate) {
    target.rotate = mixNumber(follow.rotate || 0, lead.rotate || 0, progress3);
  }
}
function getRadius(values, radiusName) {
  return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
}
var easeCrossfadeIn = /* @__PURE__ */ compress(0, 0.5, circOut);
var easeCrossfadeOut = /* @__PURE__ */ compress(0.5, 0.95, noop);
function compress(min, max, easing) {
  return (p) => {
    if (p < min)
      return 0;
    if (p > max)
      return 1;
    return easing(progress(min, max, p));
  };
}

// node_modules/framer-motion/dist/es/projection/geometry/copy.mjs
function copyAxisInto(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function copyBoxInto(box, originBox) {
  copyAxisInto(box.x, originBox.x);
  copyAxisInto(box.y, originBox.y);
}
function copyAxisDeltaInto(delta, originDelta) {
  delta.translate = originDelta.translate;
  delta.scale = originDelta.scale;
  delta.originPoint = originDelta.originPoint;
  delta.origin = originDelta.origin;
}

// node_modules/framer-motion/dist/es/projection/geometry/delta-remove.mjs
function removePointDelta(point, translate, scale3, originPoint, boxScale) {
  point -= translate;
  point = scalePoint(point, 1 / scale3, originPoint);
  if (boxScale !== void 0) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }
  return point;
}
function removeAxisDelta(axis, translate = 0, scale3 = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
  if (percent.test(translate)) {
    translate = parseFloat(translate);
    const relativeProgress = mixNumber(sourceAxis.min, sourceAxis.max, translate / 100);
    translate = relativeProgress - sourceAxis.min;
  }
  if (typeof translate !== "number")
    return;
  let originPoint = mixNumber(originAxis.min, originAxis.max, origin);
  if (axis === originAxis)
    originPoint -= translate;
  axis.min = removePointDelta(axis.min, translate, scale3, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale3, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
  removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
  removeAxisTransforms(box.x, transforms, xKeys, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
  removeAxisTransforms(box.y, transforms, yKeys, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
}

// node_modules/framer-motion/dist/es/projection/geometry/utils.mjs
function isAxisDeltaZero(delta) {
  return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
  return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function axisEquals(a, b) {
  return a.min === b.min && a.max === b.max;
}
function boxEquals(a, b) {
  return axisEquals(a.x, b.x) && axisEquals(a.y, b.y);
}
function axisEqualsRounded(a, b) {
  return Math.round(a.min) === Math.round(b.min) && Math.round(a.max) === Math.round(b.max);
}
function boxEqualsRounded(a, b) {
  return axisEqualsRounded(a.x, b.x) && axisEqualsRounded(a.y, b.y);
}
function aspectRatio(box) {
  return calcLength(box.x) / calcLength(box.y);
}
function axisDeltaEquals(a, b) {
  return a.translate === b.translate && a.scale === b.scale && a.originPoint === b.originPoint;
}

// node_modules/framer-motion/dist/es/projection/shared/stack.mjs
var NodeStack = class {
  constructor() {
    this.members = [];
  }
  add(node) {
    addUniqueItem(this.members, node);
    node.scheduleRender();
  }
  remove(node) {
    removeItem(this.members, node);
    if (node === this.prevLead) {
      this.prevLead = void 0;
    }
    if (node === this.lead) {
      const prevLead = this.members[this.members.length - 1];
      if (prevLead) {
        this.promote(prevLead);
      }
    }
  }
  relegate(node) {
    const indexOfNode = this.members.findIndex((member) => node === member);
    if (indexOfNode === 0)
      return false;
    let prevLead;
    for (let i = indexOfNode; i >= 0; i--) {
      const member = this.members[i];
      if (member.isPresent !== false) {
        prevLead = member;
        break;
      }
    }
    if (prevLead) {
      this.promote(prevLead);
      return true;
    } else {
      return false;
    }
  }
  promote(node, preserveFollowOpacity) {
    const prevLead = this.lead;
    if (node === prevLead)
      return;
    this.prevLead = prevLead;
    this.lead = node;
    node.show();
    if (prevLead) {
      prevLead.instance && prevLead.scheduleRender();
      node.scheduleRender();
      node.resumeFrom = prevLead;
      if (preserveFollowOpacity) {
        node.resumeFrom.preserveOpacity = true;
      }
      if (prevLead.snapshot) {
        node.snapshot = prevLead.snapshot;
        node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
      }
      if (node.root && node.root.isUpdating) {
        node.isLayoutDirty = true;
      }
      const { crossfade } = node.options;
      if (crossfade === false) {
        prevLead.hide();
      }
    }
  }
  exitAnimationComplete() {
    this.members.forEach((node) => {
      const { options, resumingFrom } = node;
      options.onExitComplete && options.onExitComplete();
      if (resumingFrom) {
        resumingFrom.options.onExitComplete && resumingFrom.options.onExitComplete();
      }
    });
  }
  scheduleRender() {
    this.members.forEach((node) => {
      node.instance && node.scheduleRender(false);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    if (this.lead && this.lead.snapshot) {
      this.lead.snapshot = void 0;
    }
  }
};

// node_modules/framer-motion/dist/es/projection/styles/transform.mjs
function buildProjectionTransform(delta, treeScale, latestTransform) {
  let transform = "";
  const xTranslate = delta.x.translate / treeScale.x;
  const yTranslate = delta.y.translate / treeScale.y;
  const zTranslate = latestTransform?.z || 0;
  if (xTranslate || yTranslate || zTranslate) {
    transform = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `;
  }
  if (treeScale.x !== 1 || treeScale.y !== 1) {
    transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
  }
  if (latestTransform) {
    const { transformPerspective, rotate: rotate3, rotateX, rotateY, skewX, skewY } = latestTransform;
    if (transformPerspective)
      transform = `perspective(${transformPerspective}px) ${transform}`;
    if (rotate3)
      transform += `rotate(${rotate3}deg) `;
    if (rotateX)
      transform += `rotateX(${rotateX}deg) `;
    if (rotateY)
      transform += `rotateY(${rotateY}deg) `;
    if (skewX)
      transform += `skewX(${skewX}deg) `;
    if (skewY)
      transform += `skewY(${skewY}deg) `;
  }
  const elementScaleX = delta.x.scale * treeScale.x;
  const elementScaleY = delta.y.scale * treeScale.y;
  if (elementScaleX !== 1 || elementScaleY !== 1) {
    transform += `scale(${elementScaleX}, ${elementScaleY})`;
  }
  return transform || "none";
}

// node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs
var metrics = {
  nodes: 0,
  calculatedTargetDeltas: 0,
  calculatedProjections: 0
};
var transformAxes = ["", "X", "Y", "Z"];
var hiddenVisibility = { visibility: "hidden" };
var animationTarget = 1e3;
var id2 = 0;
function resetDistortingTransform(key, visualElement, values, sharedAnimationValues) {
  const { latestValues } = visualElement;
  if (latestValues[key]) {
    values[key] = latestValues[key];
    visualElement.setStaticValue(key, 0);
    if (sharedAnimationValues) {
      sharedAnimationValues[key] = 0;
    }
  }
}
function cancelTreeOptimisedTransformAnimations(projectionNode) {
  projectionNode.hasCheckedOptimisedAppear = true;
  if (projectionNode.root === projectionNode)
    return;
  const { visualElement } = projectionNode.options;
  if (!visualElement)
    return;
  const appearId = getOptimisedAppearId(visualElement);
  if (window.MotionHasOptimisedAnimation(appearId, "transform")) {
    const { layout: layout3, layoutId } = projectionNode.options;
    window.MotionCancelOptimisedAnimation(appearId, "transform", frame, !(layout3 || layoutId));
  }
  const { parent } = projectionNode;
  if (parent && !parent.hasCheckedOptimisedAppear) {
    cancelTreeOptimisedTransformAnimations(parent);
  }
}
function createProjectionNode2({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
  return class ProjectionNode {
    constructor(latestValues = {}, parent = defaultParent?.()) {
      this.id = id2++;
      this.animationId = 0;
      this.children = /* @__PURE__ */ new Set();
      this.options = {};
      this.isTreeAnimating = false;
      this.isAnimationBlocked = false;
      this.isLayoutDirty = false;
      this.isProjectionDirty = false;
      this.isSharedProjectionDirty = false;
      this.isTransformDirty = false;
      this.updateManuallyBlocked = false;
      this.updateBlockedByResize = false;
      this.isUpdating = false;
      this.isSVG = false;
      this.needsReset = false;
      this.shouldResetTransform = false;
      this.hasCheckedOptimisedAppear = false;
      this.treeScale = { x: 1, y: 1 };
      this.eventHandlers = /* @__PURE__ */ new Map();
      this.hasTreeAnimated = false;
      this.updateScheduled = false;
      this.scheduleUpdate = () => this.update();
      this.projectionUpdateScheduled = false;
      this.checkUpdateFailed = () => {
        if (this.isUpdating) {
          this.isUpdating = false;
          this.clearAllSnapshots();
        }
      };
      this.updateProjection = () => {
        this.projectionUpdateScheduled = false;
        if (statsBuffer.value) {
          metrics.nodes = metrics.calculatedTargetDeltas = metrics.calculatedProjections = 0;
        }
        this.nodes.forEach(propagateDirtyNodes);
        this.nodes.forEach(resolveTargetDelta);
        this.nodes.forEach(calcProjection);
        this.nodes.forEach(cleanDirtyNodes);
        if (statsBuffer.addProjectionMetrics) {
          statsBuffer.addProjectionMetrics(metrics);
        }
      };
      this.resolvedRelativeTargetAt = 0;
      this.hasProjected = false;
      this.isVisible = true;
      this.animationProgress = 0;
      this.sharedNodes = /* @__PURE__ */ new Map();
      this.latestValues = latestValues;
      this.root = parent ? parent.root || parent : this;
      this.path = parent ? [...parent.path, parent] : [];
      this.parent = parent;
      this.depth = parent ? parent.depth + 1 : 0;
      for (let i = 0; i < this.path.length; i++) {
        this.path[i].shouldResetTransform = true;
      }
      if (this.root === this)
        this.nodes = new FlatTree();
    }
    addEventListener(name, handler) {
      if (!this.eventHandlers.has(name)) {
        this.eventHandlers.set(name, new SubscriptionManager());
      }
      return this.eventHandlers.get(name).add(handler);
    }
    notifyListeners(name, ...args) {
      const subscriptionManager = this.eventHandlers.get(name);
      subscriptionManager && subscriptionManager.notify(...args);
    }
    hasListeners(name) {
      return this.eventHandlers.has(name);
    }
    /**
     * Lifecycles
     */
    mount(instance, isLayoutDirty = this.root.hasTreeAnimated) {
      if (this.instance)
        return;
      this.isSVG = isSVGElement(instance);
      this.instance = instance;
      const { layoutId, layout: layout3, visualElement } = this.options;
      if (visualElement && !visualElement.current) {
        visualElement.mount(instance);
      }
      this.root.nodes.add(this);
      this.parent && this.parent.children.add(this);
      if (isLayoutDirty && (layout3 || layoutId)) {
        this.isLayoutDirty = true;
      }
      if (attachResizeListener) {
        let cancelDelay;
        const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
        attachResizeListener(instance, () => {
          this.root.updateBlockedByResize = true;
          cancelDelay && cancelDelay();
          cancelDelay = delay(resizeUnblockUpdate, 250);
          if (globalProjectionState.hasAnimatedSinceResize) {
            globalProjectionState.hasAnimatedSinceResize = false;
            this.nodes.forEach(finishAnimation);
          }
        });
      }
      if (layoutId) {
        this.root.registerSharedNode(layoutId, this);
      }
      if (this.options.animate !== false && visualElement && (layoutId || layout3)) {
        this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeLayoutChanged, layout: newLayout }) => {
          if (this.isTreeAnimationBlocked()) {
            this.target = void 0;
            this.relativeTarget = void 0;
            return;
          }
          const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
          const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
          const hasTargetChanged = !this.targetLayout || !boxEqualsRounded(this.targetLayout, newLayout);
          const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeLayoutChanged;
          if (this.options.layoutRoot || this.resumeFrom || hasOnlyRelativeTargetChanged || hasLayoutChanged && (hasTargetChanged || !this.currentAnimation)) {
            if (this.resumeFrom) {
              this.resumingFrom = this.resumeFrom;
              this.resumingFrom.resumingFrom = void 0;
            }
            this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
            const animationOptions = {
              ...getValueTransition(layoutTransition, "layout"),
              onPlay: onLayoutAnimationStart,
              onComplete: onLayoutAnimationComplete
            };
            if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
              animationOptions.delay = 0;
              animationOptions.type = false;
            }
            this.startAnimation(animationOptions);
          } else {
            if (!hasLayoutChanged) {
              finishAnimation(this);
            }
            if (this.isLead() && this.options.onExitComplete) {
              this.options.onExitComplete();
            }
          }
          this.targetLayout = newLayout;
        });
      }
    }
    unmount() {
      this.options.layoutId && this.willUpdate();
      this.root.nodes.remove(this);
      const stack = this.getStack();
      stack && stack.remove(this);
      this.parent && this.parent.children.delete(this);
      this.instance = void 0;
      cancelFrame(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = true;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = false;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
    }
    // Note: currently only running on root node
    startUpdate() {
      if (this.isUpdateBlocked())
        return;
      this.isUpdating = true;
      this.nodes && this.nodes.forEach(resetSkewAndRotation);
      this.animationId++;
    }
    getTransformTemplate() {
      const { visualElement } = this.options;
      return visualElement && visualElement.getProps().transformTemplate;
    }
    willUpdate(shouldNotifyListeners = true) {
      this.root.hasTreeAnimated = true;
      if (this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear) {
        cancelTreeOptimisedTransformAnimations(this);
      }
      !this.root.isUpdating && this.root.startUpdate();
      if (this.isLayoutDirty)
        return;
      this.isLayoutDirty = true;
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        node.shouldResetTransform = true;
        node.updateScroll("snapshot");
        if (node.options.layoutRoot) {
          node.willUpdate(false);
        }
      }
      const { layoutId, layout: layout3 } = this.options;
      if (layoutId === void 0 && !layout3)
        return;
      const transformTemplate = this.getTransformTemplate();
      this.prevTransformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
      this.updateSnapshot();
      shouldNotifyListeners && this.notifyListeners("willUpdate");
    }
    update() {
      this.updateScheduled = false;
      const updateWasBlocked = this.isUpdateBlocked();
      if (updateWasBlocked) {
        this.unblockUpdate();
        this.clearAllSnapshots();
        this.nodes.forEach(clearMeasurements);
        return;
      }
      if (!this.isUpdating) {
        this.nodes.forEach(clearIsLayoutDirty);
      }
      this.isUpdating = false;
      this.nodes.forEach(resetTransformStyle);
      this.nodes.forEach(updateLayout);
      this.nodes.forEach(notifyLayoutUpdate);
      this.clearAllSnapshots();
      const now3 = time.now();
      frameData.delta = clamp(0, 1e3 / 60, now3 - frameData.timestamp);
      frameData.timestamp = now3;
      frameData.isProcessing = true;
      frameSteps.update.process(frameData);
      frameSteps.preRender.process(frameData);
      frameSteps.render.process(frameData);
      frameData.isProcessing = false;
    }
    didUpdate() {
      if (!this.updateScheduled) {
        this.updateScheduled = true;
        microtask.read(this.scheduleUpdate);
      }
    }
    clearAllSnapshots() {
      this.nodes.forEach(clearSnapshot);
      this.sharedNodes.forEach(removeLeadSnapshots);
    }
    scheduleUpdateProjection() {
      if (!this.projectionUpdateScheduled) {
        this.projectionUpdateScheduled = true;
        frame.preRender(this.updateProjection, false, true);
      }
    }
    scheduleCheckAfterUnmount() {
      frame.postRender(() => {
        if (this.isLayoutDirty) {
          this.root.didUpdate();
        } else {
          this.root.checkUpdateFailed();
        }
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      if (this.snapshot || !this.instance)
        return;
      this.snapshot = this.measure();
      if (this.snapshot && !calcLength(this.snapshot.measuredBox.x) && !calcLength(this.snapshot.measuredBox.y)) {
        this.snapshot = void 0;
      }
    }
    updateLayout() {
      if (!this.instance)
        return;
      this.updateScroll();
      if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
        return;
      }
      if (this.resumeFrom && !this.resumeFrom.instance) {
        for (let i = 0; i < this.path.length; i++) {
          const node = this.path[i];
          node.updateScroll();
        }
      }
      const prevLayout = this.layout;
      this.layout = this.measure(false);
      this.layoutCorrected = createBox();
      this.isLayoutDirty = false;
      this.projectionDelta = void 0;
      this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement } = this.options;
      visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : void 0);
    }
    updateScroll(phase = "measure") {
      let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) {
        needsMeasurement = false;
      }
      if (needsMeasurement) {
        const isRoot = checkIsScrollRoot(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase,
          isRoot,
          offset: measureScroll(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : isRoot
        };
      }
    }
    resetTransform() {
      if (!resetTransform)
        return;
      const isResetRequested = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout;
      const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
      const transformTemplate = this.getTransformTemplate();
      const transformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
      const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
      if (isResetRequested && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
        resetTransform(this.instance, transformTemplateValue);
        this.shouldResetTransform = false;
        this.scheduleRender();
      }
    }
    measure(removeTransform = true) {
      const pageBox = this.measurePageBox();
      let layoutBox = this.removeElementScroll(pageBox);
      if (removeTransform) {
        layoutBox = this.removeTransform(layoutBox);
      }
      roundBox(layoutBox);
      return {
        animationId: this.root.animationId,
        measuredBox: pageBox,
        layoutBox,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement } = this.options;
      if (!visualElement)
        return createBox();
      const box = visualElement.measureViewportBox();
      const wasInScrollRoot = this.scroll?.wasRoot || this.path.some(checkNodeWasScrollRoot);
      if (!wasInScrollRoot) {
        const { scroll } = this.root;
        if (scroll) {
          translateAxis(box.x, scroll.offset.x);
          translateAxis(box.y, scroll.offset.y);
        }
      }
      return box;
    }
    removeElementScroll(box) {
      const boxWithoutScroll = createBox();
      copyBoxInto(boxWithoutScroll, box);
      if (this.scroll?.wasRoot) {
        return boxWithoutScroll;
      }
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        const { scroll, options } = node;
        if (node !== this.root && scroll && options.layoutScroll) {
          if (scroll.wasRoot) {
            copyBoxInto(boxWithoutScroll, box);
          }
          translateAxis(boxWithoutScroll.x, scroll.offset.x);
          translateAxis(boxWithoutScroll.y, scroll.offset.y);
        }
      }
      return boxWithoutScroll;
    }
    applyTransform(box, transformOnly = false) {
      const withTransforms = createBox();
      copyBoxInto(withTransforms, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
          transformBox(withTransforms, {
            x: -node.scroll.offset.x,
            y: -node.scroll.offset.y
          });
        }
        if (!hasTransform(node.latestValues))
          continue;
        transformBox(withTransforms, node.latestValues);
      }
      if (hasTransform(this.latestValues)) {
        transformBox(withTransforms, this.latestValues);
      }
      return withTransforms;
    }
    removeTransform(box) {
      const boxWithoutTransform = createBox();
      copyBoxInto(boxWithoutTransform, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!node.instance)
          continue;
        if (!hasTransform(node.latestValues))
          continue;
        hasScale(node.latestValues) && node.updateSnapshot();
        const sourceBox = createBox();
        const nodeBox = node.measurePageBox();
        copyBoxInto(sourceBox, nodeBox);
        removeBoxTransforms(boxWithoutTransform, node.latestValues, node.snapshot ? node.snapshot.layoutBox : void 0, sourceBox);
      }
      if (hasTransform(this.latestValues)) {
        removeBoxTransforms(boxWithoutTransform, this.latestValues);
      }
      return boxWithoutTransform;
    }
    setTargetDelta(delta) {
      this.targetDelta = delta;
      this.root.scheduleUpdateProjection();
      this.isProjectionDirty = true;
    }
    setOptions(options) {
      this.options = {
        ...this.options,
        ...options,
        crossfade: options.crossfade !== void 0 ? options.crossfade : true
      };
    }
    clearMeasurements() {
      this.scroll = void 0;
      this.layout = void 0;
      this.snapshot = void 0;
      this.prevTransformTemplateValue = void 0;
      this.targetDelta = void 0;
      this.target = void 0;
      this.isLayoutDirty = false;
    }
    forceRelativeParentToResolveTarget() {
      if (!this.relativeParent)
        return;
      if (this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp) {
        this.relativeParent.resolveTargetDelta(true);
      }
    }
    resolveTargetDelta(forceRecalculation = false) {
      const lead = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
      this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
      this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      const canSkip = !(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize);
      if (canSkip)
        return;
      const { layout: layout3, layoutId } = this.options;
      if (!this.layout || !(layout3 || layoutId))
        return;
      this.resolvedRelativeTargetAt = frameData.timestamp;
      if (!this.targetDelta && !this.relativeTarget) {
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && relativeParent.layout && this.animationProgress !== 1) {
          this.relativeParent = relativeParent;
          this.forceRelativeParentToResolveTarget();
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      if (!this.relativeTarget && !this.targetDelta)
        return;
      if (!this.target) {
        this.target = createBox();
        this.targetWithTransforms = createBox();
      }
      if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
        this.forceRelativeParentToResolveTarget();
        calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
      } else if (this.targetDelta) {
        if (Boolean(this.resumingFrom)) {
          this.target = this.applyTransform(this.layout.layoutBox);
        } else {
          copyBoxInto(this.target, this.layout.layoutBox);
        }
        applyBoxDelta(this.target, this.targetDelta);
      } else {
        copyBoxInto(this.target, this.layout.layoutBox);
      }
      if (this.attemptToResolveRelativeTarget) {
        this.attemptToResolveRelativeTarget = false;
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) {
          this.relativeParent = relativeParent;
          this.forceRelativeParentToResolveTarget();
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.target, relativeParent.target);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      if (statsBuffer.value) {
        metrics.calculatedTargetDeltas++;
      }
    }
    getClosestProjectingParent() {
      if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)) {
        return void 0;
      }
      if (this.parent.isProjecting()) {
        return this.parent;
      } else {
        return this.parent.getClosestProjectingParent();
      }
    }
    isProjecting() {
      return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      const lead = this.getLead();
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      let canSkip = true;
      if (this.isProjectionDirty || this.parent?.isProjectionDirty) {
        canSkip = false;
      }
      if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) {
        canSkip = false;
      }
      if (this.resolvedRelativeTargetAt === frameData.timestamp) {
        canSkip = false;
      }
      if (canSkip)
        return;
      const { layout: layout3, layoutId } = this.options;
      this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
      if (!this.isTreeAnimating) {
        this.targetDelta = this.relativeTarget = void 0;
      }
      if (!this.layout || !(layout3 || layoutId))
        return;
      copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
      const prevTreeScaleX = this.treeScale.x;
      const prevTreeScaleY = this.treeScale.y;
      applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
      if (lead.layout && !lead.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
        lead.target = lead.layout.layoutBox;
        lead.targetWithTransforms = createBox();
      }
      const { target } = lead;
      if (!target) {
        if (this.prevProjectionDelta) {
          this.createProjectionDeltas();
          this.scheduleRender();
        }
        return;
      }
      if (!this.projectionDelta || !this.prevProjectionDelta) {
        this.createProjectionDeltas();
      } else {
        copyAxisDeltaInto(this.prevProjectionDelta.x, this.projectionDelta.x);
        copyAxisDeltaInto(this.prevProjectionDelta.y, this.projectionDelta.y);
      }
      calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
      if (this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY || !axisDeltaEquals(this.projectionDelta.x, this.prevProjectionDelta.x) || !axisDeltaEquals(this.projectionDelta.y, this.prevProjectionDelta.y)) {
        this.hasProjected = true;
        this.scheduleRender();
        this.notifyListeners("projectionUpdate", target);
      }
      if (statsBuffer.value) {
        metrics.calculatedProjections++;
      }
    }
    hide() {
      this.isVisible = false;
    }
    show() {
      this.isVisible = true;
    }
    scheduleRender(notifyAll = true) {
      this.options.visualElement?.scheduleRender();
      if (notifyAll) {
        const stack = this.getStack();
        stack && stack.scheduleRender();
      }
      if (this.resumingFrom && !this.resumingFrom.instance) {
        this.resumingFrom = void 0;
      }
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = createDelta();
      this.projectionDelta = createDelta();
      this.projectionDeltaWithTransform = createDelta();
    }
    setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
      const snapshot = this.snapshot;
      const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
      const mixedValues = { ...this.latestValues };
      const targetDelta = createDelta();
      if (!this.relativeParent || !this.relativeParent.options.layoutRoot) {
        this.relativeTarget = this.relativeTargetOrigin = void 0;
      }
      this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
      const relativeLayout = createBox();
      const snapshotSource = snapshot ? snapshot.source : void 0;
      const layoutSource = this.layout ? this.layout.source : void 0;
      const isSharedLayoutAnimation = snapshotSource !== layoutSource;
      const stack = this.getStack();
      const isOnlyMember = !stack || stack.members.length <= 1;
      const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
      this.animationProgress = 0;
      let prevRelativeTarget;
      this.mixTargetDelta = (latest) => {
        const progress3 = latest / 1e3;
        mixAxisDelta(targetDelta.x, delta.x, progress3);
        mixAxisDelta(targetDelta.y, delta.y, progress3);
        this.setTargetDelta(targetDelta);
        if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
          calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
          mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress3);
          if (prevRelativeTarget && boxEquals(this.relativeTarget, prevRelativeTarget)) {
            this.isProjectionDirty = false;
          }
          if (!prevRelativeTarget)
            prevRelativeTarget = createBox();
          copyBoxInto(prevRelativeTarget, this.relativeTarget);
        }
        if (isSharedLayoutAnimation) {
          this.animationValues = mixedValues;
          mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress3, shouldCrossfadeOpacity, isOnlyMember);
        }
        this.root.scheduleUpdateProjection();
        this.scheduleRender();
        this.animationProgress = progress3;
      };
      this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(options) {
      this.notifyListeners("animationStart");
      this.currentAnimation && this.currentAnimation.stop();
      if (this.resumingFrom && this.resumingFrom.currentAnimation) {
        this.resumingFrom.currentAnimation.stop();
      }
      if (this.pendingAnimation) {
        cancelFrame(this.pendingAnimation);
        this.pendingAnimation = void 0;
      }
      this.pendingAnimation = frame.update(() => {
        globalProjectionState.hasAnimatedSinceResize = true;
        activeAnimations.layout++;
        this.currentAnimation = animateSingleValue(0, animationTarget, {
          ...options,
          onUpdate: (latest) => {
            this.mixTargetDelta(latest);
            options.onUpdate && options.onUpdate(latest);
          },
          onStop: () => {
            activeAnimations.layout--;
          },
          onComplete: () => {
            activeAnimations.layout--;
            options.onComplete && options.onComplete();
            this.completeAnimation();
          }
        });
        if (this.resumingFrom) {
          this.resumingFrom.currentAnimation = this.currentAnimation;
        }
        this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      if (this.resumingFrom) {
        this.resumingFrom.currentAnimation = void 0;
        this.resumingFrom.preserveOpacity = void 0;
      }
      const stack = this.getStack();
      stack && stack.exitAnimationComplete();
      this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
      this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      if (this.currentAnimation) {
        this.mixTargetDelta && this.mixTargetDelta(animationTarget);
        this.currentAnimation.stop();
      }
      this.completeAnimation();
    }
    applyTransformsToTarget() {
      const lead = this.getLead();
      let { targetWithTransforms, target, layout: layout3, latestValues } = lead;
      if (!targetWithTransforms || !target || !layout3)
        return;
      if (this !== lead && this.layout && layout3 && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout3.layoutBox)) {
        target = this.target || createBox();
        const xLength = calcLength(this.layout.layoutBox.x);
        target.x.min = lead.target.x.min;
        target.x.max = target.x.min + xLength;
        const yLength = calcLength(this.layout.layoutBox.y);
        target.y.min = lead.target.y.min;
        target.y.max = target.y.min + yLength;
      }
      copyBoxInto(targetWithTransforms, target);
      transformBox(targetWithTransforms, latestValues);
      calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
    }
    registerSharedNode(layoutId, node) {
      if (!this.sharedNodes.has(layoutId)) {
        this.sharedNodes.set(layoutId, new NodeStack());
      }
      const stack = this.sharedNodes.get(layoutId);
      stack.add(node);
      const config = node.options.initialPromotionConfig;
      node.promote({
        transition: config ? config.transition : void 0,
        preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node) : void 0
      });
    }
    isLead() {
      const stack = this.getStack();
      return stack ? stack.lead === this : true;
    }
    getLead() {
      const { layoutId } = this.options;
      return layoutId ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId } = this.options;
      return layoutId ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId } = this.options;
      if (layoutId)
        return this.root.sharedNodes.get(layoutId);
    }
    promote({ needsReset, transition, preserveFollowOpacity } = {}) {
      const stack = this.getStack();
      if (stack)
        stack.promote(this, preserveFollowOpacity);
      if (needsReset) {
        this.projectionDelta = void 0;
        this.needsReset = true;
      }
      if (transition)
        this.setOptions({ transition });
    }
    relegate() {
      const stack = this.getStack();
      if (stack) {
        return stack.relegate(this);
      } else {
        return false;
      }
    }
    resetSkewAndRotation() {
      const { visualElement } = this.options;
      if (!visualElement)
        return;
      let hasDistortingTransform = false;
      const { latestValues } = visualElement;
      if (latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ || latestValues.skewX || latestValues.skewY) {
        hasDistortingTransform = true;
      }
      if (!hasDistortingTransform)
        return;
      const resetValues = {};
      if (latestValues.z) {
        resetDistortingTransform("z", visualElement, resetValues, this.animationValues);
      }
      for (let i = 0; i < transformAxes.length; i++) {
        resetDistortingTransform(`rotate${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
        resetDistortingTransform(`skew${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
      }
      visualElement.render();
      for (const key in resetValues) {
        visualElement.setStaticValue(key, resetValues[key]);
        if (this.animationValues) {
          this.animationValues[key] = resetValues[key];
        }
      }
      visualElement.scheduleRender();
    }
    getProjectionStyles(styleProp) {
      if (!this.instance || this.isSVG)
        return void 0;
      if (!this.isVisible) {
        return hiddenVisibility;
      }
      const styles = {
        visibility: ""
      };
      const transformTemplate = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = false;
        styles.opacity = "";
        styles.pointerEvents = resolveMotionValue(styleProp?.pointerEvents) || "";
        styles.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
        return styles;
      }
      const lead = this.getLead();
      if (!this.projectionDelta || !this.layout || !lead.target) {
        const emptyStyles = {};
        if (this.options.layoutId) {
          emptyStyles.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
          emptyStyles.pointerEvents = resolveMotionValue(styleProp?.pointerEvents) || "";
        }
        if (this.hasProjected && !hasTransform(this.latestValues)) {
          emptyStyles.transform = transformTemplate ? transformTemplate({}, "") : "none";
          this.hasProjected = false;
        }
        return emptyStyles;
      }
      const valuesToRender = lead.animationValues || lead.latestValues;
      this.applyTransformsToTarget();
      styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
      if (transformTemplate) {
        styles.transform = transformTemplate(valuesToRender, styles.transform);
      }
      const { x, y } = this.projectionDelta;
      styles.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
      if (lead.animationValues) {
        styles.opacity = lead === this ? valuesToRender.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
      } else {
        styles.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
      }
      for (const key in scaleCorrectors) {
        if (valuesToRender[key] === void 0)
          continue;
        const { correct, applyTo, isCSSVariable } = scaleCorrectors[key];
        const corrected = styles.transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
        if (applyTo) {
          const num = applyTo.length;
          for (let i = 0; i < num; i++) {
            styles[applyTo[i]] = corrected;
          }
        } else {
          if (isCSSVariable) {
            this.options.visualElement.renderState.vars[key] = corrected;
          } else {
            styles[key] = corrected;
          }
        }
      }
      if (this.options.layoutId) {
        styles.pointerEvents = lead === this ? resolveMotionValue(styleProp?.pointerEvents) || "" : "none";
      }
      return styles;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((node) => node.currentAnimation?.stop());
      this.root.nodes.forEach(clearMeasurements);
      this.root.sharedNodes.clear();
    }
  };
}
function updateLayout(node) {
  node.updateLayout();
}
function notifyLayoutUpdate(node) {
  const snapshot = node.resumeFrom?.snapshot || node.snapshot;
  if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
    const { layoutBox: layout3, measuredBox: measuredLayout } = node.layout;
    const { animationType } = node.options;
    const isShared = snapshot.source !== node.layout.source;
    if (animationType === "size") {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(axisSnapshot);
        axisSnapshot.min = layout3[axis].min;
        axisSnapshot.max = axisSnapshot.min + length;
      });
    } else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout3)) {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(layout3[axis]);
        axisSnapshot.max = axisSnapshot.min + length;
        if (node.relativeTarget && !node.currentAnimation) {
          node.isProjectionDirty = true;
          node.relativeTarget[axis].max = node.relativeTarget[axis].min + length;
        }
      });
    }
    const layoutDelta = createDelta();
    calcBoxDelta(layoutDelta, layout3, snapshot.layoutBox);
    const visualDelta = createDelta();
    if (isShared) {
      calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
    } else {
      calcBoxDelta(visualDelta, layout3, snapshot.layoutBox);
    }
    const hasLayoutChanged = !isDeltaZero(layoutDelta);
    let hasRelativeLayoutChanged = false;
    if (!node.resumeFrom) {
      const relativeParent = node.getClosestProjectingParent();
      if (relativeParent && !relativeParent.resumeFrom) {
        const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
        if (parentSnapshot && parentLayout) {
          const relativeSnapshot = createBox();
          calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
          const relativeLayout = createBox();
          calcRelativePosition(relativeLayout, layout3, parentLayout.layoutBox);
          if (!boxEqualsRounded(relativeSnapshot, relativeLayout)) {
            hasRelativeLayoutChanged = true;
          }
          if (relativeParent.options.layoutRoot) {
            node.relativeTarget = relativeLayout;
            node.relativeTargetOrigin = relativeSnapshot;
            node.relativeParent = relativeParent;
          }
        }
      }
    }
    node.notifyListeners("didUpdate", {
      layout: layout3,
      snapshot,
      delta: visualDelta,
      layoutDelta,
      hasLayoutChanged,
      hasRelativeLayoutChanged
    });
  } else if (node.isLead()) {
    const { onExitComplete } = node.options;
    onExitComplete && onExitComplete();
  }
  node.options.transition = void 0;
}
function propagateDirtyNodes(node) {
  if (statsBuffer.value) {
    metrics.nodes++;
  }
  if (!node.parent)
    return;
  if (!node.isProjecting()) {
    node.isProjectionDirty = node.parent.isProjectionDirty;
  }
  node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty || node.parent.isProjectionDirty || node.parent.isSharedProjectionDirty));
  node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
}
function cleanDirtyNodes(node) {
  node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = false;
}
function clearSnapshot(node) {
  node.clearSnapshot();
}
function clearMeasurements(node) {
  node.clearMeasurements();
}
function clearIsLayoutDirty(node) {
  node.isLayoutDirty = false;
}
function resetTransformStyle(node) {
  const { visualElement } = node.options;
  if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
    visualElement.notify("BeforeLayoutMeasure");
  }
  node.resetTransform();
}
function finishAnimation(node) {
  node.finishAnimation();
  node.targetDelta = node.relativeTarget = node.target = void 0;
  node.isProjectionDirty = true;
}
function resolveTargetDelta(node) {
  node.resolveTargetDelta();
}
function calcProjection(node) {
  node.calcProjection();
}
function resetSkewAndRotation(node) {
  node.resetSkewAndRotation();
}
function removeLeadSnapshots(stack) {
  stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p) {
  output.translate = mixNumber(delta.translate, 0, p);
  output.scale = mixNumber(delta.scale, 1, p);
  output.origin = delta.origin;
  output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p) {
  output.min = mixNumber(from.min, to.min, p);
  output.max = mixNumber(from.max, to.max, p);
}
function mixBox(output, from, to, p) {
  mixAxis(output.x, from.x, to.x, p);
  mixAxis(output.y, from.y, to.y, p);
}
function hasOpacityCrossfade(node) {
  return node.animationValues && node.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};
var userAgentContains = (string) => typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(string);
var roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop;
function roundAxis(axis) {
  axis.min = roundPoint(axis.min);
  axis.max = roundPoint(axis.max);
}
function roundBox(box) {
  roundAxis(box.x);
  roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout3) {
  return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout3), 0.2);
}
function checkNodeWasScrollRoot(node) {
  return node !== node.root && node.scroll?.wasRoot;
}

// node_modules/framer-motion/dist/es/projection/node/DocumentProjectionNode.mjs
var DocumentProjectionNode = createProjectionNode2({
  attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => true
});

// node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs
var rootProjectionNode = {
  current: void 0
};
var HTMLProjectionNode = createProjectionNode2({
  measureScroll: (instance) => ({
    x: instance.scrollLeft,
    y: instance.scrollTop
  }),
  defaultParent: () => {
    if (!rootProjectionNode.current) {
      const documentNode = new DocumentProjectionNode({});
      documentNode.mount(window);
      documentNode.setOptions({ layoutScroll: true });
      rootProjectionNode.current = documentNode;
    }
    return rootProjectionNode.current;
  },
  resetTransform: (instance, value) => {
    instance.style.transform = value !== void 0 ? value : "none";
  },
  checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});

// node_modules/framer-motion/dist/es/motion/features/drag.mjs
var drag = {
  pan: {
    Feature: PanGesture
  },
  drag: {
    Feature: DragGesture,
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};

// node_modules/framer-motion/dist/es/gestures/hover.mjs
function handleHoverEvent(node, event, lifecycle) {
  const { props } = node;
  if (node.animationState && props.whileHover) {
    node.animationState.setActive("whileHover", lifecycle === "Start");
  }
  const eventName = "onHover" + lifecycle;
  const callback = props[eventName];
  if (callback) {
    frame.postRender(() => callback(event, extractEventInfo(event)));
  }
}
var HoverGesture = class extends Feature {
  mount() {
    const { current } = this.node;
    if (!current)
      return;
    this.unmount = hover(current, (_element, startEvent) => {
      handleHoverEvent(this.node, startEvent, "Start");
      return (endEvent) => handleHoverEvent(this.node, endEvent, "End");
    });
  }
  unmount() {
  }
};

// node_modules/framer-motion/dist/es/gestures/focus.mjs
var FocusGesture = class extends Feature {
  constructor() {
    super(...arguments);
    this.isActive = false;
  }
  onFocus() {
    let isFocusVisible = false;
    try {
      isFocusVisible = this.node.current.matches(":focus-visible");
    } catch (e) {
      isFocusVisible = true;
    }
    if (!isFocusVisible || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", true);
    this.isActive = true;
  }
  onBlur() {
    if (!this.isActive || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", false);
    this.isActive = false;
  }
  mount() {
    this.unmount = pipe(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
};

// node_modules/framer-motion/dist/es/gestures/press.mjs
function handlePressEvent(node, event, lifecycle) {
  const { props } = node;
  if (node.current instanceof HTMLButtonElement && node.current.disabled) {
    return;
  }
  if (node.animationState && props.whileTap) {
    node.animationState.setActive("whileTap", lifecycle === "Start");
  }
  const eventName = "onTap" + (lifecycle === "End" ? "" : lifecycle);
  const callback = props[eventName];
  if (callback) {
    frame.postRender(() => callback(event, extractEventInfo(event)));
  }
}
var PressGesture = class extends Feature {
  mount() {
    const { current } = this.node;
    if (!current)
      return;
    this.unmount = press(current, (_element, startEvent) => {
      handlePressEvent(this.node, startEvent, "Start");
      return (endEvent, { success }) => handlePressEvent(this.node, endEvent, success ? "End" : "Cancel");
    }, { useGlobalTarget: this.node.props.globalTapTarget });
  }
  unmount() {
  }
};

// node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs
var observerCallbacks = /* @__PURE__ */ new WeakMap();
var observers = /* @__PURE__ */ new WeakMap();
var fireObserverCallback = (entry) => {
  const callback = observerCallbacks.get(entry.target);
  callback && callback(entry);
};
var fireAllObserverCallbacks = (entries) => {
  entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root, ...options }) {
  const lookupRoot = root || document;
  if (!observers.has(lookupRoot)) {
    observers.set(lookupRoot, {});
  }
  const rootObservers = observers.get(lookupRoot);
  const key = JSON.stringify(options);
  if (!rootObservers[key]) {
    rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, { root, ...options });
  }
  return rootObservers[key];
}
function observeIntersection(element, options, callback) {
  const rootInteresectionObserver = initIntersectionObserver(options);
  observerCallbacks.set(element, callback);
  rootInteresectionObserver.observe(element);
  return () => {
    observerCallbacks.delete(element);
    rootInteresectionObserver.unobserve(element);
  };
}

// node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs
var thresholdNames = {
  some: 0,
  all: 1
};
var InViewFeature = class extends Feature {
  constructor() {
    super(...arguments);
    this.hasEnteredView = false;
    this.isInView = false;
  }
  startObserver() {
    this.unmount();
    const { viewport = {} } = this.node.getProps();
    const { root, margin: rootMargin, amount = "some", once } = viewport;
    const options = {
      root: root ? root.current : void 0,
      rootMargin,
      threshold: typeof amount === "number" ? amount : thresholdNames[amount]
    };
    const onIntersectionUpdate = (entry) => {
      const { isIntersecting } = entry;
      if (this.isInView === isIntersecting)
        return;
      this.isInView = isIntersecting;
      if (once && !isIntersecting && this.hasEnteredView) {
        return;
      } else if (isIntersecting) {
        this.hasEnteredView = true;
      }
      if (this.node.animationState) {
        this.node.animationState.setActive("whileInView", isIntersecting);
      }
      const { onViewportEnter, onViewportLeave } = this.node.getProps();
      const callback = isIntersecting ? onViewportEnter : onViewportLeave;
      callback && callback(entry);
    };
    return observeIntersection(this.node.current, options, onIntersectionUpdate);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver === "undefined")
      return;
    const { props, prevProps } = this.node;
    const hasOptionsChanged = ["amount", "margin", "root"].some(hasViewportOptionChanged(props, prevProps));
    if (hasOptionsChanged) {
      this.startObserver();
    }
  }
  unmount() {
  }
};
function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
  return (name) => viewport[name] !== prevViewport[name];
}

// node_modules/framer-motion/dist/es/motion/features/gestures.mjs
var gestureAnimations = {
  inView: {
    Feature: InViewFeature
  },
  tap: {
    Feature: PressGesture
  },
  focus: {
    Feature: FocusGesture
  },
  hover: {
    Feature: HoverGesture
  }
};

// node_modules/framer-motion/dist/es/motion/features/layout.mjs
var layout = {
  layout: {
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};

// node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
var import_react20 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/utils/reduced-motion/state.mjs
var prefersReducedMotion = { current: null };
var hasReducedMotionListener = { current: false };

// node_modules/framer-motion/dist/es/utils/reduced-motion/index.mjs
function initPrefersReducedMotion() {
  hasReducedMotionListener.current = true;
  if (!isBrowser)
    return;
  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
    motionMediaQuery.addListener(setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.current = false;
  }
}

// node_modules/framer-motion/dist/es/render/store.mjs
var visualElementStore = /* @__PURE__ */ new WeakMap();

// node_modules/framer-motion/dist/es/render/utils/motion-values.mjs
function updateMotionValuesFromProps(element, next, prev) {
  for (const key in next) {
    const nextValue = next[key];
    const prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
      if (true) {
        warnOnce(nextValue.version === "12.9.2", `Attempting to mix Motion versions ${nextValue.version} with 12.9.2 may not work as expected.`);
      }
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue, { owner: element }));
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        const existingValue = element.getValue(key);
        if (existingValue.liveStyle === true) {
          existingValue.jump(nextValue);
        } else if (!existingValue.hasAnimated) {
          existingValue.set(nextValue);
        }
      } else {
        const latestValue = element.getStaticValue(key);
        element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
      }
    }
  }
  for (const key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}

// node_modules/framer-motion/dist/es/render/VisualElement.mjs
var propEventHandlers = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
var VisualElement = class {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
    return {};
  }
  constructor({ parent, props, presenceContext, reducedMotionConfig, blockInitialAnimation, visualState }, options = {}) {
    this.current = null;
    this.children = /* @__PURE__ */ new Set();
    this.isVariantNode = false;
    this.isControllingVariants = false;
    this.shouldReduceMotion = null;
    this.values = /* @__PURE__ */ new Map();
    this.KeyframeResolver = KeyframeResolver;
    this.features = {};
    this.valueSubscriptions = /* @__PURE__ */ new Map();
    this.prevMotionValues = {};
    this.events = {};
    this.propEventSubscriptions = {};
    this.notifyUpdate = () => this.notify("Update", this.latestValues);
    this.render = () => {
      if (!this.current)
        return;
      this.triggerBuild();
      this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
    };
    this.renderScheduledAt = 0;
    this.scheduleRender = () => {
      const now3 = time.now();
      if (this.renderScheduledAt < now3) {
        this.renderScheduledAt = now3;
        frame.render(this.render, false, true);
      }
    };
    const { latestValues, renderState } = visualState;
    this.latestValues = latestValues;
    this.baseTarget = { ...latestValues };
    this.initialValues = props.initial ? { ...latestValues } : {};
    this.renderState = renderState;
    this.parent = parent;
    this.props = props;
    this.presenceContext = presenceContext;
    this.depth = parent ? parent.depth + 1 : 0;
    this.reducedMotionConfig = reducedMotionConfig;
    this.options = options;
    this.blockInitialAnimation = Boolean(blockInitialAnimation);
    this.isControllingVariants = isControllingVariants(props);
    this.isVariantNode = isVariantNode(props);
    if (this.isVariantNode) {
      this.variantChildren = /* @__PURE__ */ new Set();
    }
    this.manuallyAnimateOnMount = Boolean(parent && parent.current);
    const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
    for (const key in initialMotionValues) {
      const value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key], false);
      }
    }
  }
  mount(instance) {
    this.current = instance;
    visualElementStore.set(instance, this);
    if (this.projection && !this.projection.instance) {
      this.projection.mount(instance);
    }
    if (this.parent && this.isVariantNode && !this.isControllingVariants) {
      this.removeFromVariantTree = this.parent.addVariantChild(this);
    }
    this.values.forEach((value, key) => this.bindToMotionValue(key, value));
    if (!hasReducedMotionListener.current) {
      initPrefersReducedMotion();
    }
    this.shouldReduceMotion = this.reducedMotionConfig === "never" ? false : this.reducedMotionConfig === "always" ? true : prefersReducedMotion.current;
    if (true) {
      warnOnce(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.");
    }
    if (this.parent)
      this.parent.children.add(this);
    this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount();
    cancelFrame(this.notifyUpdate);
    cancelFrame(this.render);
    this.valueSubscriptions.forEach((remove) => remove());
    this.valueSubscriptions.clear();
    this.removeFromVariantTree && this.removeFromVariantTree();
    this.parent && this.parent.children.delete(this);
    for (const key in this.events) {
      this.events[key].clear();
    }
    for (const key in this.features) {
      const feature = this.features[key];
      if (feature) {
        feature.unmount();
        feature.isMounted = false;
      }
    }
    this.current = null;
  }
  bindToMotionValue(key, value) {
    if (this.valueSubscriptions.has(key)) {
      this.valueSubscriptions.get(key)();
    }
    const valueIsTransform = transformProps.has(key);
    if (valueIsTransform && this.onBindTransform) {
      this.onBindTransform();
    }
    const removeOnChange = value.on("change", (latestValue) => {
      this.latestValues[key] = latestValue;
      this.props.onUpdate && frame.preRender(this.notifyUpdate);
      if (valueIsTransform && this.projection) {
        this.projection.isTransformDirty = true;
      }
    });
    const removeOnRenderRequest = value.on("renderRequest", this.scheduleRender);
    let removeSyncCheck;
    if (window.MotionCheckAppearSync) {
      removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
    }
    this.valueSubscriptions.set(key, () => {
      removeOnChange();
      removeOnRenderRequest();
      if (removeSyncCheck)
        removeSyncCheck();
      if (value.owner)
        value.stop();
    });
  }
  sortNodePosition(other) {
    if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
      return 0;
    }
    return this.sortInstanceNodePosition(this.current, other.current);
  }
  updateFeatures() {
    let key = "animation";
    for (key in featureDefinitions) {
      const featureDefinition = featureDefinitions[key];
      if (!featureDefinition)
        continue;
      const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
      if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) {
        this.features[key] = new FeatureConstructor(this);
      }
      if (this.features[key]) {
        const feature = this.features[key];
        if (feature.isMounted) {
          feature.update();
        } else {
          feature.mount();
          feature.isMounted = true;
        }
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
  }
  getStaticValue(key) {
    return this.latestValues[key];
  }
  setStaticValue(key, value) {
    this.latestValues[key] = value;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(props, presenceContext) {
    if (props.transformTemplate || this.props.transformTemplate) {
      this.scheduleRender();
    }
    this.prevProps = this.props;
    this.props = props;
    this.prevPresenceContext = this.presenceContext;
    this.presenceContext = presenceContext;
    for (let i = 0; i < propEventHandlers.length; i++) {
      const key = propEventHandlers[i];
      if (this.propEventSubscriptions[key]) {
        this.propEventSubscriptions[key]();
        delete this.propEventSubscriptions[key];
      }
      const listenerName = "on" + key;
      const listener = props[listenerName];
      if (listener) {
        this.propEventSubscriptions[key] = this.on(key, listener);
      }
    }
    this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps, this), this.prevMotionValues);
    if (this.handleChildMotionValue) {
      this.handleChildMotionValue();
    }
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(name) {
    return this.props.variants ? this.props.variants[name] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(child) {
    const closestVariantNode = this.getClosestVariantNode();
    if (closestVariantNode) {
      closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
      return () => closestVariantNode.variantChildren.delete(child);
    }
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(key, value) {
    const existingValue = this.values.get(key);
    if (value !== existingValue) {
      if (existingValue)
        this.removeValue(key);
      this.bindToMotionValue(key, value);
      this.values.set(key, value);
      this.latestValues[key] = value.get();
    }
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(key) {
    this.values.delete(key);
    const unsubscribe = this.valueSubscriptions.get(key);
    if (unsubscribe) {
      unsubscribe();
      this.valueSubscriptions.delete(key);
    }
    delete this.latestValues[key];
    this.removeValueFromRenderState(key, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(key) {
    return this.values.has(key);
  }
  getValue(key, defaultValue) {
    if (this.props.values && this.props.values[key]) {
      return this.props.values[key];
    }
    let value = this.values.get(key);
    if (value === void 0 && defaultValue !== void 0) {
      value = motionValue(defaultValue === null ? void 0 : defaultValue, { owner: this });
      this.addValue(key, value);
    }
    return value;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(key, target) {
    let value = this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : this.getBaseTargetFromProps(this.props, key) ?? this.readValueFromInstance(this.current, key, this.options);
    if (value !== void 0 && value !== null) {
      if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
        value = parseFloat(value);
      } else if (!findValueType(value) && complex.test(target)) {
        value = getAnimatableNone2(key, target);
      }
      this.setBaseTarget(key, isMotionValue(value) ? value.get() : value);
    }
    return isMotionValue(value) ? value.get() : value;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(key, value) {
    this.baseTarget[key] = value;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(key) {
    const { initial } = this.props;
    let valueFromInitial;
    if (typeof initial === "string" || typeof initial === "object") {
      const variant = resolveVariantFromProps(this.props, initial, this.presenceContext?.custom);
      if (variant) {
        valueFromInitial = variant[key];
      }
    }
    if (initial && valueFromInitial !== void 0) {
      return valueFromInitial;
    }
    const target = this.getBaseTargetFromProps(this.props, key);
    if (target !== void 0 && !isMotionValue(target))
      return target;
    return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    return this.events[eventName].add(callback);
  }
  notify(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].notify(...args);
    }
  }
};

// node_modules/framer-motion/dist/es/render/dom/DOMVisualElement.mjs
var DOMVisualElement = class extends VisualElement {
  constructor() {
    super(...arguments);
    this.KeyframeResolver = DOMKeyframesResolver;
  }
  sortInstanceNodePosition(a, b) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    return props.style ? props.style[key] : void 0;
  }
  removeValueFromRenderState(key, { vars, style }) {
    delete vars[key];
    delete style[key];
  }
  handleChildMotionValue() {
    if (this.childSubscription) {
      this.childSubscription();
      delete this.childSubscription;
    }
    const { children } = this.props;
    if (isMotionValue(children)) {
      this.childSubscription = children.on("change", (latest) => {
        if (this.current) {
          this.current.textContent = `${latest}`;
        }
      });
    }
  }
};

// node_modules/framer-motion/dist/es/render/html/utils/render.mjs
function renderHTML(element, { style, vars }, styleProp, projection) {
  Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
  for (const key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}

// node_modules/framer-motion/dist/es/render/html/HTMLVisualElement.mjs
function getComputedStyle2(element) {
  return window.getComputedStyle(element);
}
var HTMLVisualElement = class extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "html";
    this.renderInstance = renderHTML;
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      return readTransformValue(instance, key);
    } else {
      const computedStyle = getComputedStyle2(instance);
      const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, { transformPagePoint }) {
    return measureViewportBox(instance, transformPagePoint);
  }
  build(renderState, latestValues, props) {
    buildHTMLStyles(renderState, latestValues, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps(props, prevProps, visualElement);
  }
};

// node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs
var camelCaseAttributes = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);

// node_modules/framer-motion/dist/es/render/svg/utils/render.mjs
function renderSVG(element, renderState, _styleProp, projection) {
  renderHTML(element, renderState, void 0, projection);
  for (const key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}

// node_modules/framer-motion/dist/es/render/svg/SVGVisualElement.mjs
var SVGVisualElement = class extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "svg";
    this.isSVGTag = false;
    this.measureInstanceViewportBox = createBox;
  }
  getBaseTargetFromProps(props, key) {
    return props[key];
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return instance.getAttribute(key);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps2(props, prevProps, visualElement);
  }
  build(renderState, latestValues, props) {
    buildSVGAttrs(renderState, latestValues, this.isSVGTag, props.transformTemplate);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderSVG(instance, renderState, styleProp, projection);
  }
  mount(instance) {
    this.isSVGTag = isSVGTag(instance.tagName);
    super.mount(instance);
  }
};

// node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
var createDomVisualElement = (Component3, options) => {
  return isSVGComponent(Component3) ? new SVGVisualElement(options) : new HTMLVisualElement(options, {
    allowProjection: Component3 !== import_react20.Fragment
  });
};

// node_modules/framer-motion/dist/es/render/components/motion/create.mjs
var createMotionComponent = /* @__PURE__ */ createMotionComponentFactory({
  ...animations,
  ...gestureAnimations,
  ...drag,
  ...layout
}, createDomVisualElement);

// node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs
var motion = /* @__PURE__ */ createDOMMotionComponentProxy(createMotionComponent);

// node_modules/framer-motion/dist/es/index.mjs
"use client";

// node_modules/motion/dist/es/framer-motion/dist/es/context/LayoutGroupContext.mjs
var import_react21 = __toESM(require_react(), 1);
"use client";
var LayoutGroupContext2 = (0, import_react21.createContext)({});

// node_modules/motion/dist/es/framer-motion/dist/es/utils/use-constant.mjs
var import_react22 = __toESM(require_react(), 1);
function useConstant2(init) {
  const ref = (0, import_react22.useRef)(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}

// node_modules/motion/dist/es/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var import_react23 = __toESM(require_react(), 1);

// node_modules/motion/dist/es/framer-motion/dist/es/utils/is-browser.mjs
var isBrowser2 = typeof window !== "undefined";

// node_modules/motion/dist/es/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var useIsomorphicLayoutEffect2 = isBrowser2 ? import_react23.useLayoutEffect : import_react23.useEffect;

// node_modules/motion/dist/es/framer-motion/dist/es/context/PresenceContext.mjs
var import_react24 = __toESM(require_react(), 1);
"use client";
var PresenceContext2 = /* @__PURE__ */ (0, import_react24.createContext)(null);

// node_modules/motion/dist/es/framer-motion/dist/es/context/MotionConfigContext.mjs
var import_react25 = __toESM(require_react(), 1);
"use client";
var MotionConfigContext2 = (0, import_react25.createContext)({
  transformPagePoint: (p) => p,
  isStatic: false,
  reducedMotion: "never"
});

// node_modules/motion/dist/es/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
var import_react26 = __toESM(require_react(), 1);
function usePresence2(subscribe = true) {
  const context = (0, import_react26.useContext)(PresenceContext2);
  if (context === null)
    return [true, null];
  const { isPresent, onExitComplete, register } = context;
  const id5 = (0, import_react26.useId)();
  (0, import_react26.useEffect)(() => {
    if (subscribe) {
      return register(id5);
    }
  }, [subscribe]);
  const safeToRemove = (0, import_react26.useCallback)(() => subscribe && onExitComplete && onExitComplete(id5), [id5, onExitComplete, subscribe]);
  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}

// node_modules/motion/dist/es/motion-dom/dist/es/frameloop/order.mjs
var stepsOrder2 = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];

// node_modules/motion/dist/es/motion-dom/dist/es/stats/buffer.mjs
var statsBuffer2 = {
  value: null,
  addProjectionMetrics: null
};

// node_modules/motion/dist/es/motion-dom/dist/es/frameloop/render-step.mjs
function createRenderStep2(runNextFrame, stepName) {
  let thisFrame = /* @__PURE__ */ new Set();
  let nextFrame = /* @__PURE__ */ new Set();
  let isProcessing = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  let latestFrameData = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  let numCalls = 0;
  function triggerCallback(callback) {
    if (toKeepAlive.has(callback)) {
      step.schedule(callback);
      runNextFrame();
    }
    numCalls++;
    callback(latestFrameData);
  }
  const step = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing;
      const queue = addToCurrentFrame ? thisFrame : nextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (!queue.has(callback))
        queue.add(callback);
      return callback;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (callback) => {
      nextFrame.delete(callback);
      toKeepAlive.delete(callback);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (frameData3) => {
      latestFrameData = frameData3;
      if (isProcessing) {
        flushNextFrame = true;
        return;
      }
      isProcessing = true;
      [thisFrame, nextFrame] = [nextFrame, thisFrame];
      thisFrame.forEach(triggerCallback);
      if (stepName && statsBuffer2.value) {
        statsBuffer2.value.frameloop[stepName].push(numCalls);
      }
      numCalls = 0;
      thisFrame.clear();
      isProcessing = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData3);
      }
    }
  };
  return step;
}

// node_modules/motion/dist/es/motion-utils/dist/es/global-config.mjs
var MotionGlobalConfig2 = {};

// node_modules/motion/dist/es/motion-dom/dist/es/frameloop/batcher.mjs
var maxElapsed2 = 40;
function createRenderBatcher2(scheduleNextBatch, allowKeepAlive) {
  let runNextFrame = false;
  let useDefaultElapsed = true;
  const state = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  const flagRunNextFrame = () => runNextFrame = true;
  const steps = stepsOrder2.reduce((acc, key) => {
    acc[key] = createRenderStep2(flagRunNextFrame, allowKeepAlive ? key : void 0);
    return acc;
  }, {});
  const { setup, read, resolveKeyframes, preUpdate, update, preRender, render, postRender } = steps;
  const processBatch = () => {
    const timestamp = MotionGlobalConfig2.useManualTiming ? state.timestamp : performance.now();
    runNextFrame = false;
    if (!MotionGlobalConfig2.useManualTiming) {
      state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed2), 1);
    }
    state.timestamp = timestamp;
    state.isProcessing = true;
    setup.process(state);
    read.process(state);
    resolveKeyframes.process(state);
    preUpdate.process(state);
    update.process(state);
    preRender.process(state);
    render.process(state);
    postRender.process(state);
    state.isProcessing = false;
    if (runNextFrame && allowKeepAlive) {
      useDefaultElapsed = false;
      scheduleNextBatch(processBatch);
    }
  };
  const wake = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!state.isProcessing) {
      scheduleNextBatch(processBatch);
    }
  };
  const schedule = stepsOrder2.reduce((acc, key) => {
    const step = steps[key];
    acc[key] = (process2, keepAlive = false, immediate = false) => {
      if (!runNextFrame)
        wake();
      return step.schedule(process2, keepAlive, immediate);
    };
    return acc;
  }, {});
  const cancel = (process2) => {
    for (let i = 0; i < stepsOrder2.length; i++) {
      steps[stepsOrder2[i]].cancel(process2);
    }
  };
  return { schedule, cancel, state, steps };
}

// node_modules/motion/dist/es/motion-utils/dist/es/noop.mjs
var noop2 = (any) => any;

// node_modules/motion/dist/es/motion-dom/dist/es/frameloop/frame.mjs
var { schedule: frame2, cancel: cancelFrame2, state: frameData2, steps: frameSteps2 } = /* @__PURE__ */ createRenderBatcher2(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop2, true);

// node_modules/motion/dist/es/framer-motion/dist/es/context/LazyContext.mjs
var import_react27 = __toESM(require_react(), 1);
"use client";
var LazyContext2 = (0, import_react27.createContext)({ strict: false });

// node_modules/motion/dist/es/framer-motion/dist/es/motion/features/definitions.mjs
var featureProps2 = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
var featureDefinitions2 = {};
for (const key in featureProps2) {
  featureDefinitions2[key] = {
    isEnabled: (props) => featureProps2[key].some((name) => !!props[name])
  };
}

// node_modules/motion/dist/es/framer-motion/dist/es/motion/features/load-features.mjs
function loadFeatures2(features) {
  for (const key in features) {
    featureDefinitions2[key] = {
      ...featureDefinitions2[key],
      ...features[key]
    };
  }
}

// node_modules/motion/dist/es/framer-motion/dist/es/motion/utils/valid-prop.mjs
var validMotionProps2 = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function isValidMotionProp2(key) {
  return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps2.has(key);
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/filter-props.mjs
var shouldForward2 = (key) => !isValidMotionProp2(key);
function loadExternalIsValidProp2(isValidProp) {
  if (!isValidProp)
    return;
  shouldForward2 = (key) => key.startsWith("on") ? !isValidMotionProp2(key) : isValidProp(key);
}
try {
  loadExternalIsValidProp2(__require("@emotion/is-prop-valid").default);
} catch {
}
function filterProps2(props, isDom, forwardMotionProps) {
  const filteredProps = {};
  for (const key in props) {
    if (key === "values" && typeof props.values === "object")
      continue;
    if (shouldForward2(key) || forwardMotionProps === true && isValidMotionProp2(key) || !isDom && !isValidMotionProp2(key) || // If trying to use native HTML drag events, forward drag listeners
    props["draggable"] && key.startsWith("onDrag")) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}

// node_modules/motion/dist/es/motion-utils/dist/es/warn-once.mjs
var warned2 = /* @__PURE__ */ new Set();
function warnOnce2(condition, message, element) {
  if (condition || warned2.has(message))
    return;
  console.warn(message);
  if (element)
    console.warn(element);
  warned2.add(message);
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/components/create-proxy.mjs
function createDOMMotionComponentProxy2(componentFactory) {
  if (typeof Proxy === "undefined") {
    return componentFactory;
  }
  const componentCache = /* @__PURE__ */ new Map();
  const deprecatedFactoryFunction = (...args) => {
    if (true) {
      warnOnce2(false, "motion() is deprecated. Use motion.create() instead.");
    }
    return componentFactory(...args);
  };
  return new Proxy(deprecatedFactoryFunction, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (_target, key) => {
      if (key === "create")
        return componentFactory;
      if (!componentCache.has(key)) {
        componentCache.set(key, componentFactory(key));
      }
      return componentCache.get(key);
    }
  });
}

// node_modules/motion/dist/es/framer-motion/dist/es/motion/index.mjs
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var import_react33 = __toESM(require_react(), 1);

// node_modules/motion/dist/es/framer-motion/dist/es/context/MotionContext/index.mjs
var import_react28 = __toESM(require_react(), 1);
"use client";
var MotionContext2 = /* @__PURE__ */ (0, import_react28.createContext)({});

// node_modules/motion/dist/es/framer-motion/dist/es/context/MotionContext/create.mjs
var import_react29 = __toESM(require_react(), 1);

// node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/is-animation-controls.mjs
function isAnimationControls2(v) {
  return v !== null && typeof v === "object" && typeof v.start === "function";
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/utils/is-variant-label.mjs
function isVariantLabel2(v) {
  return typeof v === "string" || Array.isArray(v);
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/utils/variant-props.mjs
var variantPriorityOrder2 = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
];
var variantProps2 = ["initial", ...variantPriorityOrder2];

// node_modules/motion/dist/es/framer-motion/dist/es/render/utils/is-controlling-variants.mjs
function isControllingVariants2(props) {
  return isAnimationControls2(props.animate) || variantProps2.some((name) => isVariantLabel2(props[name]));
}
function isVariantNode2(props) {
  return Boolean(isControllingVariants2(props) || props.variants);
}

// node_modules/motion/dist/es/framer-motion/dist/es/context/MotionContext/utils.mjs
function getCurrentTreeVariants2(props, context) {
  if (isControllingVariants2(props)) {
    const { initial, animate } = props;
    return {
      initial: initial === false || isVariantLabel2(initial) ? initial : void 0,
      animate: isVariantLabel2(animate) ? animate : void 0
    };
  }
  return props.inherit !== false ? context : {};
}

// node_modules/motion/dist/es/framer-motion/dist/es/context/MotionContext/create.mjs
function useCreateMotionContext2(props) {
  const { initial, animate } = getCurrentTreeVariants2(props, (0, import_react29.useContext)(MotionContext2));
  return (0, import_react29.useMemo)(() => ({ initial, animate }), [variantLabelsAsDependency2(initial), variantLabelsAsDependency2(animate)]);
}
function variantLabelsAsDependency2(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}

// node_modules/motion/dist/es/framer-motion/dist/es/motion/utils/symbol.mjs
var motionComponentSymbol2 = Symbol.for("motionComponentSymbol");

// node_modules/motion/dist/es/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
var import_react30 = __toESM(require_react(), 1);

// node_modules/motion/dist/es/framer-motion/dist/es/utils/is-ref-object.mjs
function isRefObject2(ref) {
  return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}

// node_modules/motion/dist/es/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
function useMotionRef2(visualState, visualElement, externalRef) {
  return (0, import_react30.useCallback)(
    (instance) => {
      if (instance) {
        visualState.onMount && visualState.onMount(instance);
      }
      if (visualElement) {
        if (instance) {
          visualElement.mount(instance);
        } else {
          visualElement.unmount();
        }
      }
      if (externalRef) {
        if (typeof externalRef === "function") {
          externalRef(instance);
        } else if (isRefObject2(externalRef)) {
          externalRef.current = instance;
        }
      }
    },
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [visualElement]
  );
}

// node_modules/motion/dist/es/framer-motion/dist/es/motion/utils/use-visual-element.mjs
var import_react32 = __toESM(require_react(), 1);

// node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs
var camelToDash2 = (str) => str.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();

// node_modules/motion/dist/es/framer-motion/dist/es/animation/optimized-appear/data-id.mjs
var optimizedAppearDataId2 = "framerAppearId";
var optimizedAppearDataAttribute2 = "data-" + camelToDash2(optimizedAppearDataId2);

// node_modules/motion/dist/es/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs
var import_react31 = __toESM(require_react(), 1);
"use client";
var SwitchLayoutGroupContext2 = (0, import_react31.createContext)({});

// node_modules/motion/dist/es/motion-dom/dist/es/frameloop/microtask.mjs
var { schedule: microtask2, cancel: cancelMicrotask2 } = /* @__PURE__ */ createRenderBatcher2(queueMicrotask, false);

// node_modules/motion/dist/es/framer-motion/dist/es/motion/utils/use-visual-element.mjs
function useVisualElement2(Component3, visualState, props, createVisualElement, ProjectionNodeConstructor) {
  const { visualElement: parent } = (0, import_react32.useContext)(MotionContext2);
  const lazyContext = (0, import_react32.useContext)(LazyContext2);
  const presenceContext = (0, import_react32.useContext)(PresenceContext2);
  const reducedMotionConfig = (0, import_react32.useContext)(MotionConfigContext2).reducedMotion;
  const visualElementRef = (0, import_react32.useRef)(null);
  createVisualElement = createVisualElement || lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component3, {
      visualState,
      parent,
      props,
      presenceContext,
      blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
      reducedMotionConfig
    });
  }
  const visualElement = visualElementRef.current;
  const initialLayoutGroupConfig = (0, import_react32.useContext)(SwitchLayoutGroupContext2);
  if (visualElement && !visualElement.projection && ProjectionNodeConstructor && (visualElement.type === "html" || visualElement.type === "svg")) {
    createProjectionNode3(visualElementRef.current, props, ProjectionNodeConstructor, initialLayoutGroupConfig);
  }
  const isMounted = (0, import_react32.useRef)(false);
  (0, import_react32.useInsertionEffect)(() => {
    if (visualElement && isMounted.current) {
      visualElement.update(props, presenceContext);
    }
  });
  const optimisedAppearId = props[optimizedAppearDataAttribute2];
  const wantsHandoff = (0, import_react32.useRef)(Boolean(optimisedAppearId) && !window.MotionHandoffIsComplete?.(optimisedAppearId) && window.MotionHasOptimisedAnimation?.(optimisedAppearId));
  useIsomorphicLayoutEffect2(() => {
    if (!visualElement)
      return;
    isMounted.current = true;
    window.MotionIsMounted = true;
    visualElement.updateFeatures();
    microtask2.render(visualElement.render);
    if (wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
  });
  (0, import_react32.useEffect)(() => {
    if (!visualElement)
      return;
    if (!wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
    if (wantsHandoff.current) {
      queueMicrotask(() => {
        window.MotionHandoffMarkAsComplete?.(optimisedAppearId);
      });
      wantsHandoff.current = false;
    }
  });
  return visualElement;
}
function createProjectionNode3(visualElement, props, ProjectionNodeConstructor, initialPromotionConfig) {
  const { layoutId, layout: layout3, drag: drag3, dragConstraints, layoutScroll, layoutRoot, layoutCrossfade } = props;
  visualElement.projection = new ProjectionNodeConstructor(visualElement.latestValues, props["data-framer-portal-id"] ? void 0 : getClosestProjectingNode2(visualElement.parent));
  visualElement.projection.setOptions({
    layoutId,
    layout: layout3,
    alwaysMeasureLayout: Boolean(drag3) || dragConstraints && isRefObject2(dragConstraints),
    visualElement,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof layout3 === "string" ? layout3 : "both",
    initialPromotionConfig,
    crossfade: layoutCrossfade,
    layoutScroll,
    layoutRoot
  });
}
function getClosestProjectingNode2(visualElement) {
  if (!visualElement)
    return void 0;
  return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode2(visualElement.parent);
}

// node_modules/motion/dist/es/motion-utils/dist/es/errors.mjs
var warning2 = () => {
};
var invariant2 = () => {
};
if (true) {
  warning2 = (check, message) => {
    if (!check && typeof console !== "undefined") {
      console.warn(message);
    }
  };
  invariant2 = (check, message) => {
    if (!check) {
      throw new Error(message);
    }
  };
}

// node_modules/motion/dist/es/framer-motion/dist/es/motion/index.mjs
"use client";
function createRendererMotionComponent2({ preloadedFeatures, createVisualElement, useRender, useVisualState, Component: Component3 }) {
  preloadedFeatures && loadFeatures2(preloadedFeatures);
  function MotionComponent(props, externalRef) {
    let MeasureLayout3;
    const configAndProps = {
      ...(0, import_react33.useContext)(MotionConfigContext2),
      ...props,
      layoutId: useLayoutId2(props)
    };
    const { isStatic } = configAndProps;
    const context = useCreateMotionContext2(props);
    const visualState = useVisualState(props, isStatic);
    if (!isStatic && isBrowser2) {
      useStrictMode2(configAndProps, preloadedFeatures);
      const layoutProjection = getProjectionFunctionality2(configAndProps);
      MeasureLayout3 = layoutProjection.MeasureLayout;
      context.visualElement = useVisualElement2(Component3, visualState, configAndProps, createVisualElement, layoutProjection.ProjectionNode);
    }
    return (0, import_jsx_runtime3.jsxs)(MotionContext2.Provider, { value: context, children: [MeasureLayout3 && context.visualElement ? (0, import_jsx_runtime3.jsx)(MeasureLayout3, { visualElement: context.visualElement, ...configAndProps }) : null, useRender(Component3, props, useMotionRef2(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement)] });
  }
  MotionComponent.displayName = `motion.${typeof Component3 === "string" ? Component3 : `create(${Component3.displayName ?? Component3.name ?? ""})`}`;
  const ForwardRefMotionComponent = (0, import_react33.forwardRef)(MotionComponent);
  ForwardRefMotionComponent[motionComponentSymbol2] = Component3;
  return ForwardRefMotionComponent;
}
function useLayoutId2({ layoutId }) {
  const layoutGroupId = (0, import_react33.useContext)(LayoutGroupContext2).id;
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function useStrictMode2(configAndProps, preloadedFeatures) {
  const isStrict = (0, import_react33.useContext)(LazyContext2).strict;
  if (preloadedFeatures && isStrict) {
    const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
    configAndProps.ignoreStrict ? warning2(false, strictMessage) : invariant2(false, strictMessage);
  }
}
function getProjectionFunctionality2(props) {
  const { drag: drag3, layout: layout3 } = featureDefinitions2;
  if (!drag3 && !layout3)
    return {};
  const combined = { ...drag3, ...layout3 };
  return {
    MeasureLayout: drag3?.isEnabled(props) || layout3?.isEnabled(props) ? combined.MeasureLayout : void 0,
    ProjectionNode: combined.ProjectionNode
  };
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/dom/use-render.mjs
var import_react36 = __toESM(require_react(), 1);

// node_modules/motion/dist/es/framer-motion/dist/es/render/html/use-props.mjs
var import_react34 = __toESM(require_react(), 1);

// node_modules/motion/dist/es/motion-dom/dist/es/animation/utils/is-css-variable.mjs
var checkStringStartsWith2 = (token) => (key) => typeof key === "string" && key.startsWith(token);
var isCSSVariableName2 = /* @__PURE__ */ checkStringStartsWith2("--");
var startsAsVariableToken2 = /* @__PURE__ */ checkStringStartsWith2("var(--");
var isCSSVariableToken2 = (value) => {
  const startsWithToken = startsAsVariableToken2(value);
  if (!startsWithToken)
    return false;
  return singleCssVariableRegex2.test(value.split("/*")[0].trim());
};
var singleCssVariableRegex2 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;

// node_modules/motion/dist/es/framer-motion/dist/es/projection/styles/scale-correction.mjs
var scaleCorrectors2 = {};
function addScaleCorrector2(correctors) {
  for (const key in correctors) {
    scaleCorrectors2[key] = correctors[key];
    if (isCSSVariableName2(key)) {
      scaleCorrectors2[key].isCSSVariable = true;
    }
  }
}

// node_modules/motion/dist/es/motion-dom/dist/es/render/utils/keys-transform.mjs
var transformPropOrder2 = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
];
var transformProps2 = /* @__PURE__ */ (() => new Set(transformPropOrder2))();

// node_modules/motion/dist/es/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs
function isForcedMotionValue2(key, { layout: layout3, layoutId }) {
  return transformProps2.has(key) || key.startsWith("origin") || (layout3 || layoutId !== void 0) && (!!scaleCorrectors2[key] || key === "opacity");
}

// node_modules/motion/dist/es/framer-motion/dist/es/value/utils/is-motion-value.mjs
var isMotionValue2 = (value) => Boolean(value && value.getVelocity);

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/utils/get-as-type.mjs
var getValueAsType2 = (value, type) => {
  return type && typeof value === "number" ? type.transform(value) : value;
};

// node_modules/motion/dist/es/motion-utils/dist/es/clamp.mjs
var clamp2 = (min, max, v) => {
  if (v > max)
    return max;
  if (v < min)
    return min;
  return v;
};

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/numbers/index.mjs
var number2 = {
  test: (v) => typeof v === "number",
  parse: parseFloat,
  transform: (v) => v
};
var alpha2 = {
  ...number2,
  transform: (v) => clamp2(0, 1, v)
};
var scale2 = {
  ...number2,
  default: 1
};

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/int.mjs
var int2 = {
  ...number2,
  transform: Math.round
};

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/numbers/units.mjs
var createUnitType2 = (unit) => ({
  test: (v) => typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
  parse: parseFloat,
  transform: (v) => `${v}${unit}`
});
var degrees2 = /* @__PURE__ */ createUnitType2("deg");
var percent2 = /* @__PURE__ */ createUnitType2("%");
var px2 = /* @__PURE__ */ createUnitType2("px");
var vh2 = /* @__PURE__ */ createUnitType2("vh");
var vw2 = /* @__PURE__ */ createUnitType2("vw");
var progressPercentage2 = /* @__PURE__ */ (() => ({
  ...percent2,
  parse: (v) => percent2.parse(v) / 100,
  transform: (v) => percent2.transform(v * 100)
}))();

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/maps/transform.mjs
var transformValueTypes2 = {
  rotate: degrees2,
  rotateX: degrees2,
  rotateY: degrees2,
  rotateZ: degrees2,
  scale: scale2,
  scaleX: scale2,
  scaleY: scale2,
  scaleZ: scale2,
  skew: degrees2,
  skewX: degrees2,
  skewY: degrees2,
  distance: px2,
  translateX: px2,
  translateY: px2,
  translateZ: px2,
  x: px2,
  y: px2,
  z: px2,
  perspective: px2,
  transformPerspective: px2,
  opacity: alpha2,
  originX: progressPercentage2,
  originY: progressPercentage2,
  originZ: px2
};

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/maps/number.mjs
var numberValueTypes2 = {
  // Border props
  borderWidth: px2,
  borderTopWidth: px2,
  borderRightWidth: px2,
  borderBottomWidth: px2,
  borderLeftWidth: px2,
  borderRadius: px2,
  radius: px2,
  borderTopLeftRadius: px2,
  borderTopRightRadius: px2,
  borderBottomRightRadius: px2,
  borderBottomLeftRadius: px2,
  // Positioning props
  width: px2,
  maxWidth: px2,
  height: px2,
  maxHeight: px2,
  top: px2,
  right: px2,
  bottom: px2,
  left: px2,
  // Spacing props
  padding: px2,
  paddingTop: px2,
  paddingRight: px2,
  paddingBottom: px2,
  paddingLeft: px2,
  margin: px2,
  marginTop: px2,
  marginRight: px2,
  marginBottom: px2,
  marginLeft: px2,
  // Misc
  backgroundPositionX: px2,
  backgroundPositionY: px2,
  ...transformValueTypes2,
  zIndex: int2,
  // SVG
  fillOpacity: alpha2,
  strokeOpacity: alpha2,
  numOctaves: int2
};

// node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/build-transform.mjs
var translateAlias2 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
var numTransforms2 = transformPropOrder2.length;
function buildTransform2(latestValues, transform, transformTemplate) {
  let transformString = "";
  let transformIsDefault = true;
  for (let i = 0; i < numTransforms2; i++) {
    const key = transformPropOrder2[i];
    const value = latestValues[key];
    if (value === void 0)
      continue;
    let valueIsDefault = true;
    if (typeof value === "number") {
      valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
    } else {
      valueIsDefault = parseFloat(value) === 0;
    }
    if (!valueIsDefault || transformTemplate) {
      const valueAsType = getValueAsType2(value, numberValueTypes2[key]);
      if (!valueIsDefault) {
        transformIsDefault = false;
        const transformName = translateAlias2[key] || key;
        transformString += `${transformName}(${valueAsType}) `;
      }
      if (transformTemplate) {
        transform[key] = valueAsType;
      }
    }
  }
  transformString = transformString.trim();
  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/build-styles.mjs
function buildHTMLStyles2(state, latestValues, transformTemplate) {
  const { style, vars, transformOrigin } = state;
  let hasTransform3 = false;
  let hasTransformOrigin = false;
  for (const key in latestValues) {
    const value = latestValues[key];
    if (transformProps2.has(key)) {
      hasTransform3 = true;
      continue;
    } else if (isCSSVariableName2(key)) {
      vars[key] = value;
      continue;
    } else {
      const valueAsType = getValueAsType2(value, numberValueTypes2[key]);
      if (key.startsWith("origin")) {
        hasTransformOrigin = true;
        transformOrigin[key] = valueAsType;
      } else {
        style[key] = valueAsType;
      }
    }
  }
  if (!latestValues.transform) {
    if (hasTransform3 || transformTemplate) {
      style.transform = buildTransform2(latestValues, state.transform, transformTemplate);
    } else if (style.transform) {
      style.transform = "none";
    }
  }
  if (hasTransformOrigin) {
    const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
    style.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/create-render-state.mjs
var createHtmlRenderState2 = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});

// node_modules/motion/dist/es/framer-motion/dist/es/render/html/use-props.mjs
function copyRawValuesOnly2(target, source, props) {
  for (const key in source) {
    if (!isMotionValue2(source[key]) && !isForcedMotionValue2(key, props)) {
      target[key] = source[key];
    }
  }
}
function useInitialMotionValues2({ transformTemplate }, visualState) {
  return (0, import_react34.useMemo)(() => {
    const state = createHtmlRenderState2();
    buildHTMLStyles2(state, visualState, transformTemplate);
    return Object.assign({}, state.vars, state.style);
  }, [visualState]);
}
function useStyle2(props, visualState) {
  const styleProp = props.style || {};
  const style = {};
  copyRawValuesOnly2(style, styleProp, props);
  Object.assign(style, useInitialMotionValues2(props, visualState));
  return style;
}
function useHTMLProps2(props, visualState) {
  const htmlProps = {};
  const style = useStyle2(props, visualState);
  if (props.drag && props.dragListener !== false) {
    htmlProps.draggable = false;
    style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
    style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
  }
  if (props.tabIndex === void 0 && (props.onTap || props.onTapStart || props.whileTap)) {
    htmlProps.tabIndex = 0;
  }
  htmlProps.style = style;
  return htmlProps;
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/svg/lowercase-elements.mjs
var lowercaseSVGElements2 = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];

// node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
function isSVGComponent2(Component3) {
  if (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof Component3 !== "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    Component3.includes("-")
  ) {
    return false;
  } else if (
    /**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */
    lowercaseSVGElements2.indexOf(Component3) > -1 || /**
     * If it contains a capital letter, it's an SVG component
     */
    /[A-Z]/u.test(Component3)
  ) {
    return true;
  }
  return false;
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/svg/use-props.mjs
var import_react35 = __toESM(require_react(), 1);

// node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/path.mjs
var dashKeys2 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys2 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath2(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
  attrs.pathLength = 1;
  const keys = useDashCase ? dashKeys2 : camelKeys2;
  attrs[keys.offset] = px2.transform(-offset);
  const pathLength = px2.transform(length);
  const pathSpacing = px2.transform(spacing);
  attrs[keys.array] = `${pathLength} ${pathSpacing}`;
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
function buildSVGAttrs2(state, {
  attrX,
  attrY,
  attrScale,
  pathLength,
  pathSpacing = 1,
  pathOffset = 0,
  // This is object creation, which we try to avoid per-frame.
  ...latest
}, isSVGTag3, transformTemplate) {
  buildHTMLStyles2(state, latest, transformTemplate);
  if (isSVGTag3) {
    if (state.style.viewBox) {
      state.attrs.viewBox = state.style.viewBox;
    }
    return;
  }
  state.attrs = state.style;
  state.style = {};
  const { attrs, style } = state;
  if (attrs.transform) {
    style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (style.transform || attrs.transformOrigin) {
    style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
    delete attrs.transformOrigin;
  }
  if (style.transform) {
    style.transformBox = "fill-box";
    delete attrs.transformBox;
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (attrScale !== void 0)
    attrs.scale = attrScale;
  if (pathLength !== void 0) {
    buildSVGPath2(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/create-render-state.mjs
var createSvgRenderState2 = () => ({
  ...createHtmlRenderState2(),
  attrs: {}
});

// node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs
var isSVGTag2 = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";

// node_modules/motion/dist/es/framer-motion/dist/es/render/svg/use-props.mjs
function useSVGProps2(props, visualState, _isStatic, Component3) {
  const visualProps = (0, import_react35.useMemo)(() => {
    const state = createSvgRenderState2();
    buildSVGAttrs2(state, visualState, isSVGTag2(Component3), props.transformTemplate);
    return {
      ...state.attrs,
      style: { ...state.style }
    };
  }, [visualState]);
  if (props.style) {
    const rawStyles = {};
    copyRawValuesOnly2(rawStyles, props.style, props);
    visualProps.style = { ...rawStyles, ...visualProps.style };
  }
  return visualProps;
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/dom/use-render.mjs
function createUseRender2(forwardMotionProps = false) {
  const useRender = (Component3, props, ref, { latestValues }, isStatic) => {
    const useVisualProps = isSVGComponent2(Component3) ? useSVGProps2 : useHTMLProps2;
    const visualProps = useVisualProps(props, latestValues, isStatic, Component3);
    const filteredProps = filterProps2(props, typeof Component3 === "string", forwardMotionProps);
    const elementProps = Component3 !== import_react36.Fragment ? { ...filteredProps, ...visualProps, ref } : {};
    const { children } = props;
    const renderedChildren = (0, import_react36.useMemo)(() => isMotionValue2(children) ? children.get() : children, [children]);
    return (0, import_react36.createElement)(Component3, {
      ...elementProps,
      children: renderedChildren
    });
  };
  return useRender;
}

// node_modules/motion/dist/es/framer-motion/dist/es/motion/utils/use-visual-state.mjs
var import_react37 = __toESM(require_react(), 1);

// node_modules/motion/dist/es/framer-motion/dist/es/render/utils/resolve-variants.mjs
function getValueState2(visualElement) {
  const state = [{}, {}];
  visualElement?.values.forEach((value, key) => {
    state[0][key] = value.get();
    state[1][key] = value.getVelocity();
  });
  return state;
}
function resolveVariantFromProps2(props, definition, custom, visualElement) {
  if (typeof definition === "function") {
    const [current, velocity] = getValueState2(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
  }
  if (typeof definition === "string") {
    definition = props.variants && props.variants[definition];
  }
  if (typeof definition === "function") {
    const [current, velocity] = getValueState2(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
  }
  return definition;
}

// node_modules/motion/dist/es/framer-motion/dist/es/value/utils/resolve-motion-value.mjs
function resolveMotionValue2(value) {
  return isMotionValue2(value) ? value.get() : value;
}

// node_modules/motion/dist/es/framer-motion/dist/es/motion/utils/use-visual-state.mjs
function makeState2({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps5, createRenderState }, props, context, presenceContext) {
  const state = {
    latestValues: makeLatestValues2(props, context, presenceContext, scrapeMotionValuesFromProps5),
    renderState: createRenderState()
  };
  return state;
}
var makeUseVisualState2 = (config) => (props, isStatic) => {
  const context = (0, import_react37.useContext)(MotionContext2);
  const presenceContext = (0, import_react37.useContext)(PresenceContext2);
  const make = () => makeState2(config, props, context, presenceContext);
  return isStatic ? make() : useConstant2(make);
};
function makeLatestValues2(props, context, presenceContext, scrapeMotionValues) {
  const values = {};
  const motionValues = scrapeMotionValues(props, {});
  for (const key in motionValues) {
    values[key] = resolveMotionValue2(motionValues[key]);
  }
  let { initial, animate } = props;
  const isControllingVariants$1 = isControllingVariants2(props);
  const isVariantNode$1 = isVariantNode2(props);
  if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
    if (initial === void 0)
      initial = context.initial;
    if (animate === void 0)
      animate = context.animate;
  }
  let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
  isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
  const variantToSet = isInitialAnimationBlocked ? animate : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls2(variantToSet)) {
    const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    for (let i = 0; i < list.length; i++) {
      const resolved = resolveVariantFromProps2(props, list[i]);
      if (resolved) {
        const { transitionEnd, transition, ...target } = resolved;
        for (const key in target) {
          let valueTarget = target[key];
          if (Array.isArray(valueTarget)) {
            const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
            valueTarget = valueTarget[index];
          }
          if (valueTarget !== null) {
            values[key] = valueTarget;
          }
        }
        for (const key in transitionEnd) {
          values[key] = transitionEnd[key];
        }
      }
    }
  }
  return values;
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps3(props, prevProps, visualElement) {
  const { style } = props;
  const newValues = {};
  for (const key in style) {
    if (isMotionValue2(style[key]) || prevProps.style && isMotionValue2(prevProps.style[key]) || isForcedMotionValue2(key, props) || visualElement?.getValue(key)?.liveStyle !== void 0) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/html/config-motion.mjs
var htmlMotionConfig2 = {
  useVisualState: makeUseVisualState2({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps3,
    createRenderState: createHtmlRenderState2
  })
};

// node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps4(props, prevProps, visualElement) {
  const newValues = scrapeMotionValuesFromProps3(props, prevProps, visualElement);
  for (const key in props) {
    if (isMotionValue2(props[key]) || isMotionValue2(prevProps[key])) {
      const targetKey = transformPropOrder2.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/svg/config-motion.mjs
var svgMotionConfig2 = {
  useVisualState: makeUseVisualState2({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps4,
    createRenderState: createSvgRenderState2
  })
};

// node_modules/motion/dist/es/framer-motion/dist/es/render/components/create-factory.mjs
function createMotionComponentFactory2(preloadedFeatures, createVisualElement) {
  return function createMotionComponent3(Component3, { forwardMotionProps } = { forwardMotionProps: false }) {
    const baseConfig = isSVGComponent2(Component3) ? svgMotionConfig2 : htmlMotionConfig2;
    const config = {
      ...baseConfig,
      preloadedFeatures,
      useRender: createUseRender2(forwardMotionProps),
      createVisualElement,
      Component: Component3
    };
    return createRendererMotionComponent2(config);
  };
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs
function resolveVariant2(visualElement, definition, custom) {
  const props = visualElement.getProps();
  return resolveVariantFromProps2(props, definition, custom !== void 0 ? custom : props.custom, visualElement);
}

// node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs
var isKeyframesTarget2 = (v) => {
  return Array.isArray(v);
};

// node_modules/motion/dist/es/motion-dom/dist/es/frameloop/sync-time.mjs
var now2;
function clearTime2() {
  now2 = void 0;
}
var time2 = {
  now: () => {
    if (now2 === void 0) {
      time2.set(frameData2.isProcessing || MotionGlobalConfig2.useManualTiming ? frameData2.timestamp : performance.now());
    }
    return now2;
  },
  set: (newTime) => {
    now2 = newTime;
    queueMicrotask(clearTime2);
  }
};

// node_modules/motion/dist/es/motion-utils/dist/es/array.mjs
function addUniqueItem2(arr, item) {
  if (arr.indexOf(item) === -1)
    arr.push(item);
}
function removeItem2(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1)
    arr.splice(index, 1);
}

// node_modules/motion/dist/es/motion-utils/dist/es/subscription-manager.mjs
var SubscriptionManager2 = class {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    addUniqueItem2(this.subscriptions, handler);
    return () => removeItem2(this.subscriptions, handler);
  }
  notify(a, b, c) {
    const numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a, b, c);
    } else {
      for (let i = 0; i < numSubscriptions; i++) {
        const handler = this.subscriptions[i];
        handler && handler(a, b, c);
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
};

// node_modules/motion/dist/es/motion-utils/dist/es/velocity-per-second.mjs
function velocityPerSecond2(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}

// node_modules/motion/dist/es/motion-dom/dist/es/value/index.mjs
var MAX_VELOCITY_DELTA2 = 30;
var isFloat2 = (value) => {
  return !isNaN(parseFloat(value));
};
var collectMotionValues2 = {
  current: void 0
};
var MotionValue2 = class {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(init, options = {}) {
    this.version = "12.9.1";
    this.canTrackVelocity = null;
    this.events = {};
    this.updateAndNotify = (v, render = true) => {
      const currentTime = time2.now();
      if (this.updatedAt !== currentTime) {
        this.setPrevFrameValue();
      }
      this.prev = this.current;
      this.setCurrent(v);
      if (this.current !== this.prev) {
        this.events.change?.notify(this.current);
      }
      if (render) {
        this.events.renderRequest?.notify(this.current);
      }
    };
    this.hasAnimated = false;
    this.setCurrent(init);
    this.owner = options.owner;
  }
  setCurrent(current) {
    this.current = current;
    this.updatedAt = time2.now();
    if (this.canTrackVelocity === null && current !== void 0) {
      this.canTrackVelocity = isFloat2(this.current);
    }
  }
  setPrevFrameValue(prevFrameValue = this.current) {
    this.prevFrameValue = prevFrameValue;
    this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(subscription) {
    if (true) {
      warnOnce2(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
    }
    return this.on("change", subscription);
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager2();
    }
    const unsubscribe = this.events[eventName].add(callback);
    if (eventName === "change") {
      return () => {
        unsubscribe();
        frame2.read(() => {
          if (!this.events.change.getSize()) {
            this.stop();
          }
        });
      };
    }
    return unsubscribe;
  }
  clearListeners() {
    for (const eventManagers in this.events) {
      this.events[eventManagers].clear();
    }
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(passiveEffect, stopPassiveEffect) {
    this.passiveEffect = passiveEffect;
    this.stopPassiveEffect = stopPassiveEffect;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(v, render = true) {
    if (!render || !this.passiveEffect) {
      this.updateAndNotify(v, render);
    } else {
      this.passiveEffect(v, this.updateAndNotify);
    }
  }
  setWithVelocity(prev, current, delta) {
    this.set(current);
    this.prev = void 0;
    this.prevFrameValue = prev;
    this.prevUpdatedAt = this.updatedAt - delta;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(v, endAnimation = true) {
    this.updateAndNotify(v);
    this.prev = v;
    this.prevUpdatedAt = this.prevFrameValue = void 0;
    endAnimation && this.stop();
    if (this.stopPassiveEffect)
      this.stopPassiveEffect();
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    if (collectMotionValues2.current) {
      collectMotionValues2.current.push(this);
    }
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const currentTime = time2.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || currentTime - this.updatedAt > MAX_VELOCITY_DELTA2) {
      return 0;
    }
    const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA2);
    return velocityPerSecond2(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(startAnimation) {
    this.stop();
    return new Promise((resolve) => {
      this.hasAnimated = true;
      this.animation = startAnimation(resolve);
      if (this.events.animationStart) {
        this.events.animationStart.notify();
      }
    }).then(() => {
      if (this.events.animationComplete) {
        this.events.animationComplete.notify();
      }
      this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    if (this.animation) {
      this.animation.stop();
      if (this.events.animationCancel) {
        this.events.animationCancel.notify();
      }
    }
    this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.events.destroy?.notify();
    this.clearListeners();
    this.stop();
    if (this.stopPassiveEffect) {
      this.stopPassiveEffect();
    }
  }
};
function motionValue2(init, options) {
  return new MotionValue2(init, options);
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/utils/setters.mjs
function setMotionValue2(visualElement, key, value) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key).set(value);
  } else {
    visualElement.addValue(key, motionValue2(value));
  }
}
function resolveFinalValueInKeyframes2(v) {
  return isKeyframesTarget2(v) ? v[v.length - 1] || 0 : v;
}
function setTarget2(visualElement, definition) {
  const resolved = resolveVariant2(visualElement, definition);
  let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
  target = { ...target, ...transitionEnd };
  for (const key in target) {
    const value = resolveFinalValueInKeyframes2(target[key]);
    setMotionValue2(visualElement, key, value);
  }
}

// node_modules/motion/dist/es/framer-motion/dist/es/value/use-will-change/is.mjs
function isWillChangeMotionValue2(value) {
  return Boolean(isMotionValue2(value) && value.add);
}

// node_modules/motion/dist/es/framer-motion/dist/es/value/use-will-change/add-will-change.mjs
function addValueToWillChange2(visualElement, key) {
  const willChange = visualElement.getValue("willChange");
  if (isWillChangeMotionValue2(willChange)) {
    return willChange.add(key);
  } else if (!willChange && MotionGlobalConfig2.WillChange) {
    const newWillChange = new MotionGlobalConfig2.WillChange("auto");
    visualElement.addValue("willChange", newWillChange);
    newWillChange.add(key);
  }
}

// node_modules/motion/dist/es/framer-motion/dist/es/animation/optimized-appear/get-appear-id.mjs
function getOptimisedAppearId2(visualElement) {
  return visualElement.props[optimizedAppearDataAttribute2];
}

// node_modules/motion/dist/es/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs
var isNotNull3 = (value) => value !== null;
function getFinalKeyframe3(keyframes3, { repeat, repeatType = "loop" }, finalKeyframe) {
  const resolvedKeyframes = keyframes3.filter(isNotNull3);
  const index = repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : resolvedKeyframes.length - 1;
  return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}

// node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/default-transitions.mjs
var underDampedSpring2 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
};
var criticallyDampedSpring2 = (target) => ({
  type: "spring",
  stiffness: 550,
  damping: target === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
});
var keyframesTransition2 = {
  type: "keyframes",
  duration: 0.8
};
var ease2 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
};
var getDefaultTransition2 = (valueKey, { keyframes: keyframes3 }) => {
  if (keyframes3.length > 2) {
    return keyframesTransition2;
  } else if (transformProps2.has(valueKey)) {
    return valueKey.startsWith("scale") ? criticallyDampedSpring2(keyframes3[1]) : underDampedSpring2;
  }
  return ease2;
};

// node_modules/motion/dist/es/framer-motion/dist/es/animation/utils/is-transition-defined.mjs
function isTransitionDefined2({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed, ...transition }) {
  return !!Object.keys(transition).length;
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function getValueTransition2(transition, key) {
  return transition?.[key] ?? transition?.["default"] ?? transition;
}

// node_modules/motion/dist/es/motion-utils/dist/es/time-conversion.mjs
var secondsToMilliseconds2 = (seconds) => seconds * 1e3;
var millisecondsToSeconds2 = (milliseconds) => milliseconds / 1e3;

// node_modules/motion/dist/es/motion-dom/dist/es/stats/animation-count.mjs
var activeAnimations2 = {
  layout: 0,
  mainThread: 0,
  waapi: 0
};

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/utils/sanitize.mjs
var sanitize2 = (v) => Math.round(v * 1e5) / 1e5;

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/utils/float-regex.mjs
var floatRegex2 = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/utils/is-nullish.mjs
function isNullish2(v) {
  return v == null;
}

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
var singleColorRegex2 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/color/utils.mjs
var isColorString2 = (type, testProp) => (v) => {
  return Boolean(typeof v === "string" && singleColorRegex2.test(v) && v.startsWith(type) || testProp && !isNullish2(v) && Object.prototype.hasOwnProperty.call(v, testProp));
};
var splitColor2 = (aName, bName, cName) => (v) => {
  if (typeof v !== "string")
    return v;
  const [a, b, c, alpha3] = v.match(floatRegex2);
  return {
    [aName]: parseFloat(a),
    [bName]: parseFloat(b),
    [cName]: parseFloat(c),
    alpha: alpha3 !== void 0 ? parseFloat(alpha3) : 1
  };
};

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/color/rgba.mjs
var clampRgbUnit2 = (v) => clamp2(0, 255, v);
var rgbUnit2 = {
  ...number2,
  transform: (v) => Math.round(clampRgbUnit2(v))
};
var rgba2 = {
  test: /* @__PURE__ */ isColorString2("rgb", "red"),
  parse: /* @__PURE__ */ splitColor2("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit2.transform(red) + ", " + rgbUnit2.transform(green) + ", " + rgbUnit2.transform(blue) + ", " + sanitize2(alpha2.transform(alpha$1)) + ")"
};

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/color/hex.mjs
function parseHex2(v) {
  let r2 = "";
  let g = "";
  let b = "";
  let a = "";
  if (v.length > 5) {
    r2 = v.substring(1, 3);
    g = v.substring(3, 5);
    b = v.substring(5, 7);
    a = v.substring(7, 9);
  } else {
    r2 = v.substring(1, 2);
    g = v.substring(2, 3);
    b = v.substring(3, 4);
    a = v.substring(4, 5);
    r2 += r2;
    g += g;
    b += b;
    a += a;
  }
  return {
    red: parseInt(r2, 16),
    green: parseInt(g, 16),
    blue: parseInt(b, 16),
    alpha: a ? parseInt(a, 16) / 255 : 1
  };
}
var hex2 = {
  test: /* @__PURE__ */ isColorString2("#"),
  parse: parseHex2,
  transform: rgba2.transform
};

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/color/hsla.mjs
var hsla2 = {
  test: /* @__PURE__ */ isColorString2("hsl", "hue"),
  parse: /* @__PURE__ */ splitColor2("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent2.transform(sanitize2(saturation)) + ", " + percent2.transform(sanitize2(lightness)) + ", " + sanitize2(alpha2.transform(alpha$1)) + ")";
  }
};

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/color/index.mjs
var color2 = {
  test: (v) => rgba2.test(v) || hex2.test(v) || hsla2.test(v),
  parse: (v) => {
    if (rgba2.test(v)) {
      return rgba2.parse(v);
    } else if (hsla2.test(v)) {
      return hsla2.parse(v);
    } else {
      return hex2.parse(v);
    }
  },
  transform: (v) => {
    return typeof v === "string" ? v : v.hasOwnProperty("red") ? rgba2.transform(v) : hsla2.transform(v);
  }
};

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/utils/color-regex.mjs
var colorRegex2 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/complex/index.mjs
function test2(v) {
  return isNaN(v) && typeof v === "string" && (v.match(floatRegex2)?.length || 0) + (v.match(colorRegex2)?.length || 0) > 0;
}
var NUMBER_TOKEN2 = "number";
var COLOR_TOKEN2 = "color";
var VAR_TOKEN2 = "var";
var VAR_FUNCTION_TOKEN2 = "var(";
var SPLIT_TOKEN2 = "${}";
var complexRegex2 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue2(value) {
  const originalValue = value.toString();
  const values = [];
  const indexes = {
    color: [],
    number: [],
    var: []
  };
  const types = [];
  let i = 0;
  const tokenised = originalValue.replace(complexRegex2, (parsedValue) => {
    if (color2.test(parsedValue)) {
      indexes.color.push(i);
      types.push(COLOR_TOKEN2);
      values.push(color2.parse(parsedValue));
    } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN2)) {
      indexes.var.push(i);
      types.push(VAR_TOKEN2);
      values.push(parsedValue);
    } else {
      indexes.number.push(i);
      types.push(NUMBER_TOKEN2);
      values.push(parseFloat(parsedValue));
    }
    ++i;
    return SPLIT_TOKEN2;
  });
  const split = tokenised.split(SPLIT_TOKEN2);
  return { values, split, indexes, types };
}
function parseComplexValue2(v) {
  return analyseComplexValue2(v).values;
}
function createTransformer2(source) {
  const { split, types } = analyseComplexValue2(source);
  const numSections = split.length;
  return (v) => {
    let output = "";
    for (let i = 0; i < numSections; i++) {
      output += split[i];
      if (v[i] !== void 0) {
        const type = types[i];
        if (type === NUMBER_TOKEN2) {
          output += sanitize2(v[i]);
        } else if (type === COLOR_TOKEN2) {
          output += color2.transform(v[i]);
        } else {
          output += v[i];
        }
      }
    }
    return output;
  };
}
var convertNumbersToZero2 = (v) => typeof v === "number" ? 0 : v;
function getAnimatableNone3(v) {
  const parsed = parseComplexValue2(v);
  const transformer = createTransformer2(v);
  return transformer(parsed.map(convertNumbersToZero2));
}
var complex2 = {
  test: test2,
  parse: parseComplexValue2,
  createTransformer: createTransformer2,
  getAnimatableNone: getAnimatableNone3
};

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
function hueToRgb2(p, q, t) {
  if (t < 0)
    t += 1;
  if (t > 1)
    t -= 1;
  if (t < 1 / 6)
    return p + (q - p) * 6 * t;
  if (t < 1 / 2)
    return q;
  if (t < 2 / 3)
    return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
function hslaToRgba2({ hue, saturation, lightness, alpha: alpha3 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    red = hueToRgb2(p, q, hue + 1 / 3);
    green = hueToRgb2(p, q, hue);
    blue = hueToRgb2(p, q, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha3
  };
}

// node_modules/motion/dist/es/motion-dom/dist/es/utils/mix/immediate.mjs
function mixImmediate2(a, b) {
  return (p) => p > 0 ? b : a;
}

// node_modules/motion/dist/es/motion-dom/dist/es/utils/mix/number.mjs
var mixNumber3 = (from, to, progress3) => {
  return from + (to - from) * progress3;
};

// node_modules/motion/dist/es/motion-dom/dist/es/utils/mix/color.mjs
var mixLinearColor2 = (from, to, v) => {
  const fromExpo = from * from;
  const expo = v * (to * to - fromExpo) + fromExpo;
  return expo < 0 ? 0 : Math.sqrt(expo);
};
var colorTypes2 = [hex2, rgba2, hsla2];
var getColorType2 = (v) => colorTypes2.find((type) => type.test(v));
function asRGBA2(color3) {
  const type = getColorType2(color3);
  warning2(Boolean(type), `'${color3}' is not an animatable color. Use the equivalent color code instead.`);
  if (!Boolean(type))
    return false;
  let model = type.parse(color3);
  if (type === hsla2) {
    model = hslaToRgba2(model);
  }
  return model;
}
var mixColor2 = (from, to) => {
  const fromRGBA = asRGBA2(from);
  const toRGBA = asRGBA2(to);
  if (!fromRGBA || !toRGBA) {
    return mixImmediate2(from, to);
  }
  const blended = { ...fromRGBA };
  return (v) => {
    blended.red = mixLinearColor2(fromRGBA.red, toRGBA.red, v);
    blended.green = mixLinearColor2(fromRGBA.green, toRGBA.green, v);
    blended.blue = mixLinearColor2(fromRGBA.blue, toRGBA.blue, v);
    blended.alpha = mixNumber3(fromRGBA.alpha, toRGBA.alpha, v);
    return rgba2.transform(blended);
  };
};

// node_modules/motion/dist/es/motion-dom/dist/es/utils/mix/visibility.mjs
var invisibleValues2 = /* @__PURE__ */ new Set(["none", "hidden"]);
function mixVisibility2(origin, target) {
  if (invisibleValues2.has(origin)) {
    return (p) => p <= 0 ? origin : target;
  } else {
    return (p) => p >= 1 ? target : origin;
  }
}

// node_modules/motion/dist/es/motion-utils/dist/es/pipe.mjs
var combineFunctions2 = (a, b) => (v) => b(a(v));
var pipe2 = (...transformers) => transformers.reduce(combineFunctions2);

// node_modules/motion/dist/es/motion-dom/dist/es/utils/mix/complex.mjs
function mixNumber4(a, b) {
  return (p) => mixNumber3(a, b, p);
}
function getMixer2(a) {
  if (typeof a === "number") {
    return mixNumber4;
  } else if (typeof a === "string") {
    return isCSSVariableToken2(a) ? mixImmediate2 : color2.test(a) ? mixColor2 : mixComplex2;
  } else if (Array.isArray(a)) {
    return mixArray2;
  } else if (typeof a === "object") {
    return color2.test(a) ? mixColor2 : mixObject2;
  }
  return mixImmediate2;
}
function mixArray2(a, b) {
  const output = [...a];
  const numValues = output.length;
  const blendValue = a.map((v, i) => getMixer2(v)(v, b[i]));
  return (p) => {
    for (let i = 0; i < numValues; i++) {
      output[i] = blendValue[i](p);
    }
    return output;
  };
}
function mixObject2(a, b) {
  const output = { ...a, ...b };
  const blendValue = {};
  for (const key in output) {
    if (a[key] !== void 0 && b[key] !== void 0) {
      blendValue[key] = getMixer2(a[key])(a[key], b[key]);
    }
  }
  return (v) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v);
    }
    return output;
  };
}
function matchOrder2(origin, target) {
  const orderedOrigin = [];
  const pointers = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < target.values.length; i++) {
    const type = target.types[i];
    const originIndex = origin.indexes[type][pointers[type]];
    const originValue = origin.values[originIndex] ?? 0;
    orderedOrigin[i] = originValue;
    pointers[type]++;
  }
  return orderedOrigin;
}
var mixComplex2 = (origin, target) => {
  const template = complex2.createTransformer(target);
  const originStats = analyseComplexValue2(origin);
  const targetStats = analyseComplexValue2(target);
  const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
  if (canInterpolate) {
    if (invisibleValues2.has(origin) && !targetStats.values.length || invisibleValues2.has(target) && !originStats.values.length) {
      return mixVisibility2(origin, target);
    }
    return pipe2(mixArray2(matchOrder2(originStats, targetStats), targetStats.values), template);
  } else {
    warning2(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
    return mixImmediate2(origin, target);
  }
};

// node_modules/motion/dist/es/motion-dom/dist/es/utils/mix/index.mjs
function mix2(from, to, p) {
  if (typeof from === "number" && typeof to === "number" && typeof p === "number") {
    return mixNumber3(from, to, p);
  }
  const mixer = getMixer2(from);
  return mixer(from, to);
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/drivers/driver-frameloop.mjs
var frameloopDriver2 = (update) => {
  const passTimestamp = ({ timestamp }) => update(timestamp);
  return {
    start: () => frame2.update(passTimestamp, true),
    stop: () => cancelFrame2(passTimestamp),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => frameData2.isProcessing ? frameData2.timestamp : time2.now()
  };
};

// node_modules/motion/dist/es/motion-dom/dist/es/animation/waapi/utils/linear.mjs
var generateLinearEasing2 = (easing, duration, resolution = 10) => {
  let points = "";
  const numPoints = Math.max(Math.round(duration / resolution), 2);
  for (let i = 0; i < numPoints; i++) {
    points += easing(i / (numPoints - 1)) + ", ";
  }
  return `linear(${points.substring(0, points.length - 2)})`;
};

// node_modules/motion/dist/es/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs
var maxGeneratorDuration2 = 2e4;
function calcGeneratorDuration2(generator) {
  let duration = 0;
  const timeStep = 50;
  let state = generator.next(duration);
  while (!state.done && duration < maxGeneratorDuration2) {
    duration += timeStep;
    state = generator.next(duration);
  }
  return duration >= maxGeneratorDuration2 ? Infinity : duration;
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function createGeneratorEasing2(options, scale3 = 100, createGenerator) {
  const generator = createGenerator({ ...options, keyframes: [0, scale3] });
  const duration = Math.min(calcGeneratorDuration2(generator), maxGeneratorDuration2);
  return {
    type: "keyframes",
    ease: (progress3) => {
      return generator.next(duration * progress3).value / scale3;
    },
    duration: millisecondsToSeconds2(duration)
  };
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var velocitySampleDuration2 = 5;
function calcGeneratorVelocity2(resolveValue, t, current) {
  const prevT = Math.max(t - velocitySampleDuration2, 0);
  return velocityPerSecond2(current - resolveValue(prevT), t - prevT);
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/generators/spring/defaults.mjs
var springDefaults2 = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};

// node_modules/motion/dist/es/motion-dom/dist/es/animation/generators/spring/find.mjs
var safeMin2 = 1e-3;
function findSpring2({ duration = springDefaults2.duration, bounce = springDefaults2.bounce, velocity = springDefaults2.velocity, mass = springDefaults2.mass }) {
  let envelope;
  let derivative;
  warning2(duration <= secondsToMilliseconds2(springDefaults2.maxDuration), "Spring duration must be 10 seconds or less");
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp2(springDefaults2.minDamping, springDefaults2.maxDamping, dampingRatio);
  duration = clamp2(springDefaults2.minDuration, springDefaults2.maxDuration, millisecondsToSeconds2(duration));
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a = exponentialDecay - velocity;
      const b = calcAngularFreq2(undampedFreq2, dampingRatio);
      const c = Math.exp(-delta);
      return safeMin2 - a / b * c;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d = delta * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f = Math.exp(-delta);
      const g = calcAngularFreq2(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin2 > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin2 + a * b;
    };
    derivative = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (velocity - undampedFreq2) * (duration * duration);
      return a * b;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot2(envelope, derivative, initialGuess);
  duration = secondsToMilliseconds2(duration);
  if (isNaN(undampedFreq)) {
    return {
      stiffness: springDefaults2.stiffness,
      damping: springDefaults2.damping,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
var rootIterations2 = 12;
function approximateRoot2(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations2; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq2(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/generators/spring/index.mjs
var durationKeys2 = ["duration", "bounce"];
var physicsKeys2 = ["stiffness", "damping", "mass"];
function isSpringType2(options, keys) {
  return keys.some((key) => options[key] !== void 0);
}
function getSpringOptions2(options) {
  let springOptions = {
    velocity: springDefaults2.velocity,
    stiffness: springDefaults2.stiffness,
    damping: springDefaults2.damping,
    mass: springDefaults2.mass,
    isResolvedFromDuration: false,
    ...options
  };
  if (!isSpringType2(options, physicsKeys2) && isSpringType2(options, durationKeys2)) {
    if (options.visualDuration) {
      const visualDuration = options.visualDuration;
      const root = 2 * Math.PI / (visualDuration * 1.2);
      const stiffness = root * root;
      const damping = 2 * clamp2(0.05, 1, 1 - (options.bounce || 0)) * Math.sqrt(stiffness);
      springOptions = {
        ...springOptions,
        mass: springDefaults2.mass,
        stiffness,
        damping
      };
    } else {
      const derived = findSpring2(options);
      springOptions = {
        ...springOptions,
        ...derived,
        mass: springDefaults2.mass
      };
      springOptions.isResolvedFromDuration = true;
    }
  }
  return springOptions;
}
function spring2(optionsOrVisualDuration = springDefaults2.visualDuration, bounce = springDefaults2.bounce) {
  const options = typeof optionsOrVisualDuration !== "object" ? {
    visualDuration: optionsOrVisualDuration,
    keyframes: [0, 1],
    bounce
  } : optionsOrVisualDuration;
  let { restSpeed, restDelta } = options;
  const origin = options.keyframes[0];
  const target = options.keyframes[options.keyframes.length - 1];
  const state = { done: false, value: origin };
  const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions2({
    ...options,
    velocity: -millisecondsToSeconds2(options.velocity || 0)
  });
  const initialVelocity = velocity || 0;
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const initialDelta = target - origin;
  const undampedAngularFreq = millisecondsToSeconds2(Math.sqrt(stiffness / mass));
  const isGranularScale = Math.abs(initialDelta) < 5;
  restSpeed || (restSpeed = isGranularScale ? springDefaults2.restSpeed.granular : springDefaults2.restSpeed.default);
  restDelta || (restDelta = isGranularScale ? springDefaults2.restDelta.granular : springDefaults2.restDelta.default);
  let resolveSpring;
  if (dampingRatio < 1) {
    const angularFreq = calcAngularFreq2(undampedAngularFreq, dampingRatio);
    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
    };
  } else if (dampingRatio === 1) {
    resolveSpring = (t) => target - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
  } else {
    const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      const freqForT = Math.min(dampedAngularFreq * t, 300);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
    };
  }
  const generator = {
    calculatedDuration: isResolvedFromDuration ? duration || null : null,
    next: (t) => {
      const current = resolveSpring(t);
      if (!isResolvedFromDuration) {
        let currentVelocity = t === 0 ? initialVelocity : 0;
        if (dampingRatio < 1) {
          currentVelocity = t === 0 ? secondsToMilliseconds2(initialVelocity) : calcGeneratorVelocity2(resolveSpring, t, current);
        }
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t >= duration;
      }
      state.value = state.done ? target : current;
      return state;
    },
    toString: () => {
      const calculatedDuration = Math.min(calcGeneratorDuration2(generator), maxGeneratorDuration2);
      const easing = generateLinearEasing2((progress3) => generator.next(calculatedDuration * progress3).value, calculatedDuration, 30);
      return calculatedDuration + "ms " + easing;
    },
    toTransition: () => {
    }
  };
  return generator;
}
spring2.applyToOptions = (options) => {
  const generatorOptions = createGeneratorEasing2(options, 100, spring2);
  options.ease = generatorOptions.ease;
  options.duration = secondsToMilliseconds2(generatorOptions.duration);
  options.type = "keyframes";
  return options;
};

// node_modules/motion/dist/es/motion-dom/dist/es/animation/generators/inertia.mjs
function inertia2({ keyframes: keyframes3, velocity = 0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
  const origin = keyframes3[0];
  const state = {
    done: false,
    value: origin
  };
  const isOutOfBounds = (v) => min !== void 0 && v < min || max !== void 0 && v > max;
  const nearestBoundary = (v) => {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  };
  let amplitude = power * velocity;
  const ideal = origin + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - origin;
  const calcDelta = (t) => -amplitude * Math.exp(-t / timeConstant);
  const calcLatest = (t) => target + calcDelta(t);
  const applyFriction = (t) => {
    const delta = calcDelta(t);
    const latest = calcLatest(t);
    state.done = Math.abs(delta) <= restDelta;
    state.value = state.done ? target : latest;
  };
  let timeReachedBoundary;
  let spring$1;
  const checkCatchBoundary = (t) => {
    if (!isOutOfBounds(state.value))
      return;
    timeReachedBoundary = t;
    spring$1 = spring2({
      keyframes: [state.value, nearestBoundary(state.value)],
      velocity: calcGeneratorVelocity2(calcLatest, t, state.value),
      // TODO: This should be passing * 1000
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDelta,
      restSpeed
    });
  };
  checkCatchBoundary(0);
  return {
    calculatedDuration: null,
    next: (t) => {
      let hasUpdatedFrame = false;
      if (!spring$1 && timeReachedBoundary === void 0) {
        hasUpdatedFrame = true;
        applyFriction(t);
        checkCatchBoundary(t);
      }
      if (timeReachedBoundary !== void 0 && t >= timeReachedBoundary) {
        return spring$1.next(t - timeReachedBoundary);
      } else {
        !hasUpdatedFrame && applyFriction(t);
        return state;
      }
    }
  };
}

// node_modules/motion/dist/es/motion-utils/dist/es/progress.mjs
var progress2 = (from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

// node_modules/motion/dist/es/motion-dom/dist/es/utils/interpolate.mjs
function createMixers2(output, ease3, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || MotionGlobalConfig2.mix || mix2;
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease3) {
      const easingFunction = Array.isArray(ease3) ? ease3[i] || noop2 : ease3;
      mixer = pipe2(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function interpolate2(input, output, { clamp: isClamp = true, ease: ease3, mixer } = {}) {
  const inputLength = input.length;
  invariant2(inputLength === output.length, "Both input and output ranges must be the same length");
  if (inputLength === 1)
    return () => output[0];
  if (inputLength === 2 && output[0] === output[1])
    return () => output[1];
  const isZeroDeltaRange = input[0] === input[1];
  if (input[0] > input[inputLength - 1]) {
    input = [...input].reverse();
    output = [...output].reverse();
  }
  const mixers = createMixers2(output, ease3, mixer);
  const numMixers = mixers.length;
  const interpolator = (v) => {
    if (isZeroDeltaRange && v < input[0])
      return output[0];
    let i = 0;
    if (numMixers > 1) {
      for (; i < input.length - 2; i++) {
        if (v < input[i + 1])
          break;
      }
    }
    const progressInRange = progress2(input[i], input[i + 1], v);
    return mixers[i](progressInRange);
  };
  return isClamp ? (v) => interpolator(clamp2(input[0], input[inputLength - 1], v)) : interpolator;
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs
function fillOffset2(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = progress2(0, remaining, i);
    offset.push(mixNumber3(min, 1, offsetProgress));
  }
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
function defaultOffset2(arr) {
  const offset = [0];
  fillOffset2(offset, arr.length - 1);
  return offset;
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
function convertOffsetToTimes2(offset, duration) {
  return offset.map((o) => o * duration);
}

// node_modules/motion/dist/es/motion-utils/dist/es/easing/cubic-bezier.mjs
var calcBezier2 = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
var subdivisionPrecision2 = 1e-7;
var subdivisionMaxIterations2 = 12;
function binarySubdivide2(x, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier2(currentT, mX1, mX2) - x;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision2 && ++i < subdivisionMaxIterations2);
  return currentT;
}
function cubicBezier2(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noop2;
  const getTForX = (aX) => binarySubdivide2(aX, 0, 1, mX1, mX2);
  return (t) => t === 0 || t === 1 ? t : calcBezier2(getTForX(t), mY1, mY2);
}

// node_modules/motion/dist/es/motion-utils/dist/es/easing/ease.mjs
var easeIn2 = /* @__PURE__ */ cubicBezier2(0.42, 0, 1, 1);
var easeOut2 = /* @__PURE__ */ cubicBezier2(0, 0, 0.58, 1);
var easeInOut2 = /* @__PURE__ */ cubicBezier2(0.42, 0, 0.58, 1);

// node_modules/motion/dist/es/motion-utils/dist/es/easing/utils/is-easing-array.mjs
var isEasingArray2 = (ease3) => {
  return Array.isArray(ease3) && typeof ease3[0] !== "number";
};

// node_modules/motion/dist/es/motion-utils/dist/es/easing/modifiers/mirror.mjs
var mirrorEasing2 = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;

// node_modules/motion/dist/es/motion-utils/dist/es/easing/modifiers/reverse.mjs
var reverseEasing2 = (easing) => (p) => 1 - easing(1 - p);

// node_modules/motion/dist/es/motion-utils/dist/es/easing/back.mjs
var backOut2 = /* @__PURE__ */ cubicBezier2(0.33, 1.53, 0.69, 0.99);
var backIn2 = /* @__PURE__ */ reverseEasing2(backOut2);
var backInOut2 = /* @__PURE__ */ mirrorEasing2(backIn2);

// node_modules/motion/dist/es/motion-utils/dist/es/easing/anticipate.mjs
var anticipate2 = (p) => (p *= 2) < 1 ? 0.5 * backIn2(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));

// node_modules/motion/dist/es/motion-utils/dist/es/easing/circ.mjs
var circIn2 = (p) => 1 - Math.sin(Math.acos(p));
var circOut2 = reverseEasing2(circIn2);
var circInOut2 = mirrorEasing2(circIn2);

// node_modules/motion/dist/es/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs
var isBezierDefinition2 = (easing) => Array.isArray(easing) && typeof easing[0] === "number";

// node_modules/motion/dist/es/motion-utils/dist/es/easing/utils/map.mjs
var easingLookup2 = {
  linear: noop2,
  easeIn: easeIn2,
  easeInOut: easeInOut2,
  easeOut: easeOut2,
  circIn: circIn2,
  circInOut: circInOut2,
  circOut: circOut2,
  backIn: backIn2,
  backInOut: backInOut2,
  backOut: backOut2,
  anticipate: anticipate2
};
var isValidEasing2 = (easing) => {
  return typeof easing === "string";
};
var easingDefinitionToFunction2 = (definition) => {
  if (isBezierDefinition2(definition)) {
    invariant2(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`);
    const [x1, y1, x2, y2] = definition;
    return cubicBezier2(x1, y1, x2, y2);
  } else if (isValidEasing2(definition)) {
    invariant2(easingLookup2[definition] !== void 0, `Invalid easing type '${definition}'`);
    return easingLookup2[definition];
  }
  return definition;
};

// node_modules/motion/dist/es/motion-dom/dist/es/animation/generators/keyframes.mjs
function defaultEasing2(values, easing) {
  return values.map(() => easing || easeInOut2).splice(0, values.length - 1);
}
function keyframes2({ duration = 300, keyframes: keyframeValues, times, ease: ease3 = "easeInOut" }) {
  const easingFunctions = isEasingArray2(ease3) ? ease3.map(easingDefinitionToFunction2) : easingDefinitionToFunction2(ease3);
  const state = {
    done: false,
    value: keyframeValues[0]
  };
  const absoluteTimes = convertOffsetToTimes2(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length ? times : defaultOffset2(keyframeValues),
    duration
  );
  const mapTimeToKeyframe = interpolate2(absoluteTimes, keyframeValues, {
    ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing2(keyframeValues, easingFunctions)
  });
  return {
    calculatedDuration: duration,
    next: (t) => {
      state.value = mapTimeToKeyframe(t);
      state.done = t >= duration;
      return state;
    }
  };
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/keyframes/get-final.mjs
var isNotNull4 = (value) => value !== null;
function getFinalKeyframe4(keyframes3, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
  const resolvedKeyframes = keyframes3.filter(isNotNull4);
  const useFirstKeyframe = speed < 0 || repeat && repeatType !== "loop" && repeat % 2 === 1;
  const index = useFirstKeyframe ? 0 : resolvedKeyframes.length - 1;
  return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var transitionTypeMap2 = {
  decay: inertia2,
  inertia: inertia2,
  tween: keyframes2,
  keyframes: keyframes2,
  spring: spring2
};
function replaceTransitionType2(transition) {
  if (typeof transition.type === "string") {
    transition.type = transitionTypeMap2[transition.type];
  }
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/utils/WithPromise.mjs
var WithPromise2 = class {
  constructor() {
    this.count = 0;
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this.count++;
    this._finished = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(onResolve, onReject) {
    return this.finished.then(onResolve, onReject);
  }
};

// node_modules/motion/dist/es/motion-dom/dist/es/animation/JSAnimation.mjs
var percentToProgress2 = (percent3) => percent3 / 100;
var JSAnimation2 = class extends WithPromise2 {
  constructor(options) {
    super();
    this.state = "idle";
    this.startTime = null;
    this.isStopped = false;
    this.currentTime = 0;
    this.holdTime = null;
    this.playbackSpeed = 1;
    this.stop = () => {
      const { motionValue: motionValue3 } = this.options;
      if (motionValue3 && motionValue3.updatedAt !== time2.now()) {
        this.tick(time2.now());
      }
      this.isStopped = true;
      if (this.state === "idle")
        return;
      this.teardown();
      const { onStop } = this.options;
      onStop && onStop();
    };
    activeAnimations2.mainThread++;
    this.options = options;
    this.initAnimation();
    this.play();
    if (options.autoplay === false)
      this.pause();
  }
  initAnimation() {
    const { options } = this;
    replaceTransitionType2(options);
    const { type = keyframes2, repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = options;
    let { keyframes: keyframes$1 } = options;
    const generatorFactory = type || keyframes2;
    if (generatorFactory !== keyframes2) {
      invariant2(keyframes$1.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${keyframes$1}`);
    }
    if (generatorFactory !== keyframes2 && typeof keyframes$1[0] !== "number") {
      this.mixKeyframes = pipe2(percentToProgress2, mix2(keyframes$1[0], keyframes$1[1]));
      keyframes$1 = [0, 100];
    }
    const generator = generatorFactory({ ...options, keyframes: keyframes$1 });
    if (repeatType === "mirror") {
      this.mirroredGenerator = generatorFactory({
        ...options,
        keyframes: [...keyframes$1].reverse(),
        velocity: -velocity
      });
    }
    if (generator.calculatedDuration === null) {
      generator.calculatedDuration = calcGeneratorDuration2(generator);
    }
    const { calculatedDuration } = generator;
    this.calculatedDuration = calculatedDuration;
    this.resolvedDuration = calculatedDuration + repeatDelay;
    this.totalDuration = this.resolvedDuration * (repeat + 1) - repeatDelay;
    this.generator = generator;
  }
  updateTime(timestamp) {
    const animationTime = Math.round(timestamp - this.startTime) * this.playbackSpeed;
    if (this.holdTime !== null) {
      this.currentTime = this.holdTime;
    } else {
      this.currentTime = animationTime;
    }
  }
  tick(timestamp, sample = false) {
    const { generator, totalDuration, mixKeyframes, mirroredGenerator, resolvedDuration, calculatedDuration } = this;
    if (this.startTime === null)
      return generator.next(0);
    const { delay: delay3 = 0, keyframes: keyframes3, repeat, repeatType, repeatDelay, type, onUpdate, finalKeyframe } = this.options;
    if (this.speed > 0) {
      this.startTime = Math.min(this.startTime, timestamp);
    } else if (this.speed < 0) {
      this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
    }
    if (sample) {
      this.currentTime = timestamp;
    } else {
      this.updateTime(timestamp);
    }
    const timeWithoutDelay = this.currentTime - delay3 * (this.playbackSpeed >= 0 ? 1 : -1);
    const isInDelayPhase = this.playbackSpeed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
    this.currentTime = Math.max(timeWithoutDelay, 0);
    if (this.state === "finished" && this.holdTime === null) {
      this.currentTime = totalDuration;
    }
    let elapsed = this.currentTime;
    let frameGenerator = generator;
    if (repeat) {
      const progress3 = Math.min(this.currentTime, totalDuration) / resolvedDuration;
      let currentIteration = Math.floor(progress3);
      let iterationProgress = progress3 % 1;
      if (!iterationProgress && progress3 >= 1) {
        iterationProgress = 1;
      }
      iterationProgress === 1 && currentIteration--;
      currentIteration = Math.min(currentIteration, repeat + 1);
      const isOddIteration = Boolean(currentIteration % 2);
      if (isOddIteration) {
        if (repeatType === "reverse") {
          iterationProgress = 1 - iterationProgress;
          if (repeatDelay) {
            iterationProgress -= repeatDelay / resolvedDuration;
          }
        } else if (repeatType === "mirror") {
          frameGenerator = mirroredGenerator;
        }
      }
      elapsed = clamp2(0, 1, iterationProgress) * resolvedDuration;
    }
    const state = isInDelayPhase ? { done: false, value: keyframes3[0] } : frameGenerator.next(elapsed);
    if (mixKeyframes) {
      state.value = mixKeyframes(state.value);
    }
    let { done } = state;
    if (!isInDelayPhase && calculatedDuration !== null) {
      done = this.playbackSpeed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
    }
    const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
    if (isAnimationFinished && type !== inertia2) {
      state.value = getFinalKeyframe4(keyframes3, this.options, finalKeyframe, this.speed);
    }
    if (onUpdate) {
      onUpdate(state.value);
    }
    if (isAnimationFinished) {
      this.finish();
    }
    return state;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(resolve, reject) {
    return this.finished.then(resolve, reject);
  }
  get duration() {
    return millisecondsToSeconds2(this.calculatedDuration);
  }
  get time() {
    return millisecondsToSeconds2(this.currentTime);
  }
  set time(newTime) {
    newTime = secondsToMilliseconds2(newTime);
    this.currentTime = newTime;
    if (this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0) {
      this.holdTime = newTime;
    } else if (this.driver) {
      this.startTime = this.driver.now() - newTime / this.playbackSpeed;
    }
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(newSpeed) {
    this.updateTime(time2.now());
    const hasChanged = this.playbackSpeed !== newSpeed;
    this.playbackSpeed = newSpeed;
    if (hasChanged) {
      this.time = millisecondsToSeconds2(this.currentTime);
    }
  }
  play() {
    if (this.isStopped)
      return;
    const { driver = frameloopDriver2, onPlay, startTime } = this.options;
    if (!this.driver) {
      this.driver = driver((timestamp) => this.tick(timestamp));
    }
    onPlay && onPlay();
    const now3 = this.driver.now();
    if (this.state === "finished") {
      this.updateFinished();
      this.startTime = now3;
    } else if (this.holdTime !== null) {
      this.startTime = now3 - this.holdTime;
    } else if (!this.startTime) {
      this.startTime = startTime ?? now3;
    }
    if (this.state === "finished" && this.speed < 0) {
      this.startTime += this.calculatedDuration;
    }
    this.holdTime = null;
    this.state = "running";
    this.driver.start();
  }
  pause() {
    this.state = "paused";
    this.updateTime(time2.now());
    this.holdTime = this.currentTime;
  }
  complete() {
    if (this.state !== "running") {
      this.play();
    }
    this.state = "finished";
    this.holdTime = null;
  }
  finish() {
    this.teardown();
    this.state = "finished";
    const { onComplete } = this.options;
    onComplete && onComplete();
  }
  cancel() {
    this.holdTime = null;
    this.startTime = 0;
    this.tick(0);
    this.teardown();
  }
  teardown() {
    this.notifyFinished();
    this.state = "idle";
    this.stopDriver();
    this.startTime = this.holdTime = null;
    activeAnimations2.mainThread--;
  }
  stopDriver() {
    if (!this.driver)
      return;
    this.driver.stop();
    this.driver = void 0;
  }
  sample(sampleTime) {
    this.startTime = 0;
    return this.tick(sampleTime, true);
  }
  attachTimeline(timeline) {
    if (this.options.allowFlatten) {
      this.options.type = "keyframes";
      this.options.ease = "linear";
      this.initAnimation();
    }
    return timeline.observe(this);
  }
};

// node_modules/motion/dist/es/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function fillWildcards2(keyframes3) {
  for (let i = 1; i < keyframes3.length; i++) {
    keyframes3[i] ?? (keyframes3[i] = keyframes3[i - 1]);
  }
}

// node_modules/motion/dist/es/motion-dom/dist/es/render/dom/parse-transform.mjs
var radToDeg2 = (rad) => rad * 180 / Math.PI;
var rotate2 = (v) => {
  const angle = radToDeg2(Math.atan2(v[1], v[0]));
  return rebaseAngle2(angle);
};
var matrix2dParsers2 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (v) => (Math.abs(v[0]) + Math.abs(v[3])) / 2,
  rotate: rotate2,
  rotateZ: rotate2,
  skewX: (v) => radToDeg2(Math.atan(v[1])),
  skewY: (v) => radToDeg2(Math.atan(v[2])),
  skew: (v) => (Math.abs(v[1]) + Math.abs(v[2])) / 2
};
var rebaseAngle2 = (angle) => {
  angle = angle % 360;
  if (angle < 0)
    angle += 360;
  return angle;
};
var rotateZ2 = rotate2;
var scaleX2 = (v) => Math.sqrt(v[0] * v[0] + v[1] * v[1]);
var scaleY2 = (v) => Math.sqrt(v[4] * v[4] + v[5] * v[5]);
var matrix3dParsers2 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: scaleX2,
  scaleY: scaleY2,
  scale: (v) => (scaleX2(v) + scaleY2(v)) / 2,
  rotateX: (v) => rebaseAngle2(radToDeg2(Math.atan2(v[6], v[5]))),
  rotateY: (v) => rebaseAngle2(radToDeg2(Math.atan2(-v[2], v[0]))),
  rotateZ: rotateZ2,
  rotate: rotateZ2,
  skewX: (v) => radToDeg2(Math.atan(v[4])),
  skewY: (v) => radToDeg2(Math.atan(v[1])),
  skew: (v) => (Math.abs(v[1]) + Math.abs(v[4])) / 2
};
function defaultTransformValue2(name) {
  return name.includes("scale") ? 1 : 0;
}
function parseValueFromTransform2(transform, name) {
  if (!transform || transform === "none") {
    return defaultTransformValue2(name);
  }
  const matrix3dMatch = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let parsers;
  let match;
  if (matrix3dMatch) {
    parsers = matrix3dParsers2;
    match = matrix3dMatch;
  } else {
    const matrix2dMatch = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    parsers = matrix2dParsers2;
    match = matrix2dMatch;
  }
  if (!match) {
    return defaultTransformValue2(name);
  }
  const valueParser = parsers[name];
  const values = match[1].split(",").map(convertTransformToNumber2);
  return typeof valueParser === "function" ? valueParser(values) : values[valueParser];
}
var readTransformValue2 = (instance, name) => {
  const { transform = "none" } = getComputedStyle(instance);
  return parseValueFromTransform2(transform, name);
};
function convertTransformToNumber2(value) {
  return parseFloat(value.trim());
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs
var isNumOrPxType2 = (v) => v === number2 || v === px2;
var transformKeys2 = /* @__PURE__ */ new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys2 = transformPropOrder2.filter((key) => !transformKeys2.has(key));
function removeNonTranslationalTransform2(visualElement) {
  const removedTransforms = [];
  nonTranslationalTransformKeys2.forEach((key) => {
    const value = visualElement.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  return removedTransforms;
}
var positionalValues2 = {
  // Dimensions
  width: ({ x }, { paddingLeft = "0", paddingRight = "0" }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
  height: ({ y }, { paddingTop = "0", paddingBottom = "0" }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
  top: (_bbox, { top }) => parseFloat(top),
  left: (_bbox, { left }) => parseFloat(left),
  bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
  right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
  // Transform
  x: (_bbox, { transform }) => parseValueFromTransform2(transform, "x"),
  y: (_bbox, { transform }) => parseValueFromTransform2(transform, "y")
};
positionalValues2.translateX = positionalValues2.x;
positionalValues2.translateY = positionalValues2.y;

// node_modules/motion/dist/es/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
var toResolve2 = /* @__PURE__ */ new Set();
var isScheduled2 = false;
var anyNeedsMeasurement2 = false;
var isForced2 = false;
function measureAllKeyframes2() {
  if (anyNeedsMeasurement2) {
    const resolversToMeasure = Array.from(toResolve2).filter((resolver) => resolver.needsMeasurement);
    const elementsToMeasure = new Set(resolversToMeasure.map((resolver) => resolver.element));
    const transformsToRestore = /* @__PURE__ */ new Map();
    elementsToMeasure.forEach((element) => {
      const removedTransforms = removeNonTranslationalTransform2(element);
      if (!removedTransforms.length)
        return;
      transformsToRestore.set(element, removedTransforms);
      element.render();
    });
    resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
    elementsToMeasure.forEach((element) => {
      element.render();
      const restore = transformsToRestore.get(element);
      if (restore) {
        restore.forEach(([key, value]) => {
          element.getValue(key)?.set(value);
        });
      }
    });
    resolversToMeasure.forEach((resolver) => resolver.measureEndState());
    resolversToMeasure.forEach((resolver) => {
      if (resolver.suspendedScrollY !== void 0) {
        window.scrollTo(0, resolver.suspendedScrollY);
      }
    });
  }
  anyNeedsMeasurement2 = false;
  isScheduled2 = false;
  toResolve2.forEach((resolver) => resolver.complete(isForced2));
  toResolve2.clear();
}
function readAllKeyframes2() {
  toResolve2.forEach((resolver) => {
    resolver.readKeyframes();
    if (resolver.needsMeasurement) {
      anyNeedsMeasurement2 = true;
    }
  });
}
function flushKeyframeResolvers2() {
  isForced2 = true;
  readAllKeyframes2();
  measureAllKeyframes2();
  isForced2 = false;
}
var KeyframeResolver2 = class {
  constructor(unresolvedKeyframes, onComplete, name, motionValue3, element, isAsync = false) {
    this.isComplete = false;
    this.isAsync = false;
    this.needsMeasurement = false;
    this.isScheduled = false;
    this.unresolvedKeyframes = [...unresolvedKeyframes];
    this.onComplete = onComplete;
    this.name = name;
    this.motionValue = motionValue3;
    this.element = element;
    this.isAsync = isAsync;
  }
  scheduleResolve() {
    this.isScheduled = true;
    if (this.isAsync) {
      toResolve2.add(this);
      if (!isScheduled2) {
        isScheduled2 = true;
        frame2.read(readAllKeyframes2);
        frame2.resolveKeyframes(measureAllKeyframes2);
      }
    } else {
      this.readKeyframes();
      this.complete();
    }
  }
  readKeyframes() {
    const { unresolvedKeyframes, name, element, motionValue: motionValue3 } = this;
    if (unresolvedKeyframes[0] === null) {
      const currentValue = motionValue3?.get();
      const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
      if (currentValue !== void 0) {
        unresolvedKeyframes[0] = currentValue;
      } else if (element && name) {
        const valueAsRead = element.readValue(name, finalKeyframe);
        if (valueAsRead !== void 0 && valueAsRead !== null) {
          unresolvedKeyframes[0] = valueAsRead;
        }
      }
      if (unresolvedKeyframes[0] === void 0) {
        unresolvedKeyframes[0] = finalKeyframe;
      }
      if (motionValue3 && currentValue === void 0) {
        motionValue3.set(unresolvedKeyframes[0]);
      }
    }
    fillWildcards2(unresolvedKeyframes);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(isForced3 = false) {
    this.isComplete = true;
    this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, isForced3);
    toResolve2.delete(this);
  }
  cancel() {
    if (!this.isComplete) {
      this.isScheduled = false;
      toResolve2.delete(this);
    }
  }
  resume() {
    if (!this.isComplete)
      this.scheduleResolve();
  }
};

// node_modules/motion/dist/es/motion-dom/dist/es/render/dom/is-css-var.mjs
var isCSSVar2 = (name) => name.startsWith("--");

// node_modules/motion/dist/es/motion-dom/dist/es/render/dom/style-set.mjs
function setStyle2(element, name, value) {
  isCSSVar2(name) ? element.style.setProperty(name, value) : element.style[name] = value;
}

// node_modules/motion/dist/es/motion-utils/dist/es/memo.mjs
function memo2(callback) {
  let result;
  return () => {
    if (result === void 0)
      result = callback();
    return result;
  };
}

// node_modules/motion/dist/es/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var supportsScrollTimeline2 = /* @__PURE__ */ memo2(() => window.ScrollTimeline !== void 0);

// node_modules/motion/dist/es/motion-dom/dist/es/utils/supports/flags.mjs
var supportsFlags2 = {};

// node_modules/motion/dist/es/motion-dom/dist/es/utils/supports/memo.mjs
function memoSupports2(callback, supportsFlag) {
  const memoized = memo2(callback);
  return () => supportsFlags2[supportsFlag] ?? memoized();
}

// node_modules/motion/dist/es/motion-dom/dist/es/utils/supports/linear-easing.mjs
var supportsLinearEasing2 = /* @__PURE__ */ memoSupports2(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch (e) {
    return false;
  }
  return true;
}, "linearEasing");

// node_modules/motion/dist/es/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs
var cubicBezierAsString2 = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;

// node_modules/motion/dist/es/motion-dom/dist/es/animation/waapi/easing/supported.mjs
var supportedWaapiEasing2 = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ cubicBezierAsString2([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ cubicBezierAsString2([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ cubicBezierAsString2([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ cubicBezierAsString2([0.33, 1.53, 0.69, 0.99])
};

// node_modules/motion/dist/es/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function mapEasingToNativeEasing2(easing, duration) {
  if (!easing) {
    return void 0;
  } else if (typeof easing === "function") {
    return supportsLinearEasing2() ? generateLinearEasing2(easing, duration) : "ease-out";
  } else if (isBezierDefinition2(easing)) {
    return cubicBezierAsString2(easing);
  } else if (Array.isArray(easing)) {
    return easing.map((segmentEasing) => mapEasingToNativeEasing2(segmentEasing, duration) || supportedWaapiEasing2.easeOut);
  } else {
    return supportedWaapiEasing2[easing];
  }
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function startWaapiAnimation2(element, valueName, keyframes3, { delay: delay3 = 0, duration = 300, repeat = 0, repeatType = "loop", ease: ease3 = "easeOut", times } = {}, pseudoElement = void 0) {
  const keyframeOptions = {
    [valueName]: keyframes3
  };
  if (times)
    keyframeOptions.offset = times;
  const easing = mapEasingToNativeEasing2(ease3, duration);
  if (Array.isArray(easing))
    keyframeOptions.easing = easing;
  if (statsBuffer2.value) {
    activeAnimations2.waapi++;
  }
  const options = {
    delay: delay3,
    duration,
    easing: !Array.isArray(easing) ? easing : "linear",
    fill: "both",
    iterations: repeat + 1,
    direction: repeatType === "reverse" ? "alternate" : "normal"
  };
  if (pseudoElement)
    options.pseudoElement = pseudoElement;
  const animation = element.animate(keyframeOptions, options);
  if (statsBuffer2.value) {
    animation.finished.finally(() => {
      activeAnimations2.waapi--;
    });
  }
  return animation;
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function isGenerator2(type) {
  return typeof type === "function" && "applyToOptions" in type;
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function applyGeneratorOptions2({ type, ...options }) {
  if (isGenerator2(type) && supportsLinearEasing2()) {
    return type.applyToOptions(options);
  } else {
    options.duration ?? (options.duration = 300);
    options.ease ?? (options.ease = "easeOut");
  }
  return options;
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/NativeAnimation.mjs
var NativeAnimation2 = class extends WithPromise2 {
  constructor(options) {
    super();
    this.finishedTime = null;
    this.isStopped = false;
    if (!options)
      return;
    const { element, name, keyframes: keyframes3, pseudoElement, allowFlatten = false, finalKeyframe, onComplete } = options;
    this.isPseudoElement = Boolean(pseudoElement);
    this.allowFlatten = allowFlatten;
    this.options = options;
    invariant2(typeof options.type !== "string", `animateMini doesn't support "type" as a string. Did you mean to import { spring } from "motion"?`);
    const transition = applyGeneratorOptions2(options);
    this.animation = startWaapiAnimation2(element, name, keyframes3, transition, pseudoElement);
    if (transition.autoplay === false) {
      this.animation.pause();
    }
    this.animation.onfinish = () => {
      this.finishedTime = this.time;
      if (!pseudoElement) {
        const keyframe = getFinalKeyframe4(keyframes3, this.options, finalKeyframe, this.speed);
        if (this.updateMotionValue) {
          this.updateMotionValue(keyframe);
        } else {
          setStyle2(element, name, keyframe);
        }
        this.animation.cancel();
      }
      onComplete?.();
      this.notifyFinished();
    };
    this.animation.oncancel = () => this.notifyFinished();
  }
  play() {
    if (this.isStopped)
      return;
    this.animation.play();
    if (this.state === "finished") {
      this.updateFinished();
    }
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch (e) {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = true;
    const { state } = this;
    if (state === "idle" || state === "finished") {
      return;
    }
    if (this.updateMotionValue) {
      this.updateMotionValue();
    } else {
      this.commitStyles();
    }
    if (!this.isPseudoElement)
      this.cancel();
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    if (!this.isPseudoElement) {
      this.animation.commitStyles?.();
    }
  }
  get duration() {
    const duration = this.animation.effect?.getComputedTiming?.().duration || 0;
    return millisecondsToSeconds2(Number(duration));
  }
  get time() {
    return millisecondsToSeconds2(Number(this.animation.currentTime) || 0);
  }
  set time(newTime) {
    this.finishedTime = null;
    this.animation.currentTime = secondsToMilliseconds2(newTime);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(newSpeed) {
    if (newSpeed < 0)
      this.finishedTime = null;
    this.animation.playbackRate = newSpeed;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(newStartTime) {
    this.animation.startTime = newStartTime;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline, observe }) {
    if (this.allowFlatten) {
      this.animation.effect?.updateTiming({ easing: "linear" });
    }
    this.animation.onfinish = null;
    if (timeline && supportsScrollTimeline2()) {
      this.animation.timeline = timeline;
      return noop2;
    } else {
      return observe(this);
    }
  }
};

// node_modules/motion/dist/es/motion-dom/dist/es/animation/waapi/utils/unsupported-easing.mjs
var unsupportedEasingFunctions2 = {
  anticipate: anticipate2,
  backInOut: backInOut2,
  circInOut: circInOut2
};
function isUnsupportedEase2(key) {
  return key in unsupportedEasingFunctions2;
}
function replaceStringEasing2(transition) {
  if (typeof transition.ease === "string" && isUnsupportedEase2(transition.ease)) {
    transition.ease = unsupportedEasingFunctions2[transition.ease];
  }
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/NativeAnimationExtended.mjs
var sampleDelta2 = 10;
var NativeAnimationExtended2 = class extends NativeAnimation2 {
  constructor(options) {
    replaceStringEasing2(options);
    replaceTransitionType2(options);
    super(options);
    if (options.startTime) {
      this.startTime = options.startTime;
    }
    this.options = options;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read commited styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(value) {
    const { motionValue: motionValue3, onUpdate, onComplete, element, ...options } = this.options;
    if (!motionValue3)
      return;
    if (value !== void 0) {
      motionValue3.set(value);
      return;
    }
    const sampleAnimation = new JSAnimation2({
      ...options,
      autoplay: false
    });
    const sampleTime = secondsToMilliseconds2(this.finishedTime ?? this.time);
    motionValue3.setWithVelocity(sampleAnimation.sample(sampleTime - sampleDelta2).value, sampleAnimation.sample(sampleTime).value, sampleDelta2);
    sampleAnimation.stop();
  }
};

// node_modules/motion/dist/es/motion-dom/dist/es/animation/utils/is-animatable.mjs
var isAnimatable2 = (value, name) => {
  if (name === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && // It's animatable if we have a string
  (complex2.test(value) || value === "0") && // And it contains numbers and/or colors
  !value.startsWith("url(")) {
    return true;
  }
  return false;
};

// node_modules/motion/dist/es/motion-dom/dist/es/animation/utils/can-animate.mjs
function hasKeyframesChanged2(keyframes3) {
  const current = keyframes3[0];
  if (keyframes3.length === 1)
    return true;
  for (let i = 0; i < keyframes3.length; i++) {
    if (keyframes3[i] !== current)
      return true;
  }
}
function canAnimate2(keyframes3, name, type, velocity) {
  const originKeyframe = keyframes3[0];
  if (originKeyframe === null)
    return false;
  if (name === "display" || name === "visibility")
    return true;
  const targetKeyframe = keyframes3[keyframes3.length - 1];
  const isOriginAnimatable = isAnimatable2(originKeyframe, name);
  const isTargetAnimatable = isAnimatable2(targetKeyframe, name);
  warning2(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". ${originKeyframe} is not an animatable value - to enable this animation set ${originKeyframe} to a value animatable to ${targetKeyframe} via the \`style\` property.`);
  if (!isOriginAnimatable || !isTargetAnimatable) {
    return false;
  }
  return hasKeyframesChanged2(keyframes3) || (type === "spring" || isGenerator2(type)) && velocity;
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
var acceleratedValues2 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);
var supportsWaapi2 = /* @__PURE__ */ memo2(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation2(options) {
  const { motionValue: motionValue3, name, repeatDelay, repeatType, damping, type } = options;
  if (!motionValue3 || !motionValue3.owner || !(motionValue3.owner.current instanceof HTMLElement)) {
    return false;
  }
  const { onUpdate, transformTemplate } = motionValue3.owner.getProps();
  return supportsWaapi2() && name && acceleratedValues2.has(name) && (name !== "transform" || !transformTemplate) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
var MAX_RESOLVE_DELAY2 = 40;
var AsyncMotionValueAnimation2 = class extends WithPromise2 {
  constructor({ autoplay = true, delay: delay3 = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes: keyframes3, name, motionValue: motionValue3, element, ...options }) {
    super();
    this.stop = () => {
      if (this._animation) {
        this._animation.stop();
        this.stopTimeline?.();
      } else {
        this.keyframeResolver?.cancel();
      }
    };
    this.createdAt = time2.now();
    const optionsWithDefaults = {
      autoplay,
      delay: delay3,
      type,
      repeat,
      repeatDelay,
      repeatType,
      name,
      motionValue: motionValue3,
      element,
      ...options
    };
    const KeyframeResolver$1 = element?.KeyframeResolver || KeyframeResolver2;
    this.keyframeResolver = new KeyframeResolver$1(keyframes3, (resolvedKeyframes, finalKeyframe, forced) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue3, element);
    this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(keyframes3, finalKeyframe, options, sync) {
    this.keyframeResolver = void 0;
    const { name, type, velocity, delay: delay3, isHandoff, onUpdate } = options;
    this.resolvedAt = time2.now();
    if (!canAnimate2(keyframes3, name, type, velocity)) {
      if (MotionGlobalConfig2.instantAnimations || !delay3) {
        onUpdate?.(getFinalKeyframe4(keyframes3, options, finalKeyframe));
      }
      keyframes3[0] = keyframes3[keyframes3.length - 1];
      options.duration = 0;
      options.repeat = 0;
    }
    const startTime = sync ? !this.resolvedAt ? this.createdAt : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY2 ? this.resolvedAt : this.createdAt : void 0;
    const resolvedOptions = {
      startTime,
      finalKeyframe,
      ...options,
      keyframes: keyframes3
    };
    const animation = !isHandoff && supportsBrowserAnimation2(resolvedOptions) ? new NativeAnimationExtended2({
      ...resolvedOptions,
      element: resolvedOptions.motionValue.owner.current
    }) : new JSAnimation2(resolvedOptions);
    animation.finished.then(() => this.notifyFinished()).catch(noop2);
    if (this.pendingTimeline) {
      this.stopTimeline = animation.attachTimeline(this.pendingTimeline);
      this.pendingTimeline = void 0;
    }
    this._animation = animation;
  }
  get finished() {
    if (!this._animation) {
      return this._finished;
    } else {
      return this.animation.finished;
    }
  }
  then(onResolve, _onReject) {
    return this.finished.finally(onResolve).then(() => {
    });
  }
  get animation() {
    if (!this._animation) {
      flushKeyframeResolvers2();
    }
    return this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get time() {
    return this.animation.time;
  }
  set time(newTime) {
    this.animation.time = newTime;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(newSpeed) {
    this.animation.speed = newSpeed;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(timeline) {
    if (this._animation) {
      this.stopTimeline = this.animation.attachTimeline(timeline);
    } else {
      this.pendingTimeline = timeline;
    }
    return () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this.animation.cancel();
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/animation/interfaces/motion-value.mjs
var animateMotionValue2 = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
  const valueTransition = getValueTransition2(transition, name) || {};
  const delay3 = valueTransition.delay || transition.delay || 0;
  let { elapsed = 0 } = transition;
  elapsed = elapsed - secondsToMilliseconds2(delay3);
  const options = {
    keyframes: Array.isArray(target) ? target : [null, target],
    ease: "easeOut",
    velocity: value.getVelocity(),
    ...valueTransition,
    delay: -elapsed,
    onUpdate: (v) => {
      value.set(v);
      valueTransition.onUpdate && valueTransition.onUpdate(v);
    },
    onComplete: () => {
      onComplete();
      valueTransition.onComplete && valueTransition.onComplete();
    },
    name,
    motionValue: value,
    element: isHandoff ? void 0 : element
  };
  if (!isTransitionDefined2(valueTransition)) {
    Object.assign(options, getDefaultTransition2(name, options));
  }
  options.duration && (options.duration = secondsToMilliseconds2(options.duration));
  options.repeatDelay && (options.repeatDelay = secondsToMilliseconds2(options.repeatDelay));
  if (options.from !== void 0) {
    options.keyframes[0] = options.from;
  }
  let shouldSkip = false;
  if (options.type === false || options.duration === 0 && !options.repeatDelay) {
    options.duration = 0;
    if (options.delay === 0) {
      shouldSkip = true;
    }
  }
  if (MotionGlobalConfig2.instantAnimations || MotionGlobalConfig2.skipAnimations) {
    shouldSkip = true;
    options.duration = 0;
    options.delay = 0;
  }
  options.allowFlatten = !valueTransition.type && !valueTransition.ease;
  if (shouldSkip && !isHandoff && value.get() !== void 0) {
    const finalKeyframe = getFinalKeyframe3(options.keyframes, valueTransition);
    if (finalKeyframe !== void 0) {
      frame2.update(() => {
        options.onUpdate(finalKeyframe);
        options.onComplete();
      });
      return;
    }
  }
  return new AsyncMotionValueAnimation2(options);
};

// node_modules/motion/dist/es/motion-dom/dist/es/render/utils/keys-position.mjs
var positionalKeys2 = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...transformPropOrder2
]);

// node_modules/motion/dist/es/framer-motion/dist/es/animation/interfaces/visual-element-target.mjs
function shouldBlockAnimation2({ protectedKeys, needsAnimating }, key) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
function animateTarget2(visualElement, targetAndTransition, { delay: delay3 = 0, transitionOverride, type } = {}) {
  let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = targetAndTransition;
  if (transitionOverride)
    transition = transitionOverride;
  const animations3 = [];
  const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
  for (const key in target) {
    const value = visualElement.getValue(key, visualElement.latestValues[key] ?? null);
    const valueTarget = target[key];
    if (valueTarget === void 0 || animationTypeState && shouldBlockAnimation2(animationTypeState, key)) {
      continue;
    }
    const valueTransition = {
      delay: delay3,
      ...getValueTransition2(transition || {}, key)
    };
    const currentValue = value.get();
    if (currentValue !== void 0 && !value.isAnimating && !Array.isArray(valueTarget) && valueTarget === currentValue && !valueTransition.velocity) {
      continue;
    }
    let isHandoff = false;
    if (window.MotionHandoffAnimation) {
      const appearId = getOptimisedAppearId2(visualElement);
      if (appearId) {
        const startTime = window.MotionHandoffAnimation(appearId, key, frame2);
        if (startTime !== null) {
          valueTransition.startTime = startTime;
          isHandoff = true;
        }
      }
    }
    addValueToWillChange2(visualElement, key);
    value.start(animateMotionValue2(key, value, valueTarget, visualElement.shouldReduceMotion && positionalKeys2.has(key) ? { type: false } : valueTransition, visualElement, isHandoff));
    const animation = value.animation;
    if (animation) {
      animations3.push(animation);
    }
  }
  if (transitionEnd) {
    Promise.all(animations3).then(() => {
      frame2.update(() => {
        transitionEnd && setTarget2(visualElement, transitionEnd);
      });
    });
  }
  return animations3;
}

// node_modules/motion/dist/es/framer-motion/dist/es/animation/interfaces/visual-element-variant.mjs
function animateVariant2(visualElement, variant, options = {}) {
  const resolved = resolveVariant2(visualElement, variant, options.type === "exit" ? visualElement.presenceContext?.custom : void 0);
  let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
  if (options.transitionOverride) {
    transition = options.transitionOverride;
  }
  const getAnimation = resolved ? () => Promise.all(animateTarget2(visualElement, resolved, options)) : () => Promise.resolve();
  const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0) => {
    const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
    return animateChildren2(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
  } : () => Promise.resolve();
  const { when } = transition;
  if (when) {
    const [first, last] = when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation];
    return first().then(() => last());
  } else {
    return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
  }
}
function animateChildren2(visualElement, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
  const animations3 = [];
  const maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
  const generateStaggerDuration = staggerDirection === 1 ? (i = 0) => i * staggerChildren : (i = 0) => maxStaggerDuration - i * staggerChildren;
  Array.from(visualElement.variantChildren).sort(sortByTreeOrder2).forEach((child, i) => {
    child.notify("AnimationStart", variant);
    animations3.push(animateVariant2(child, variant, {
      ...options,
      delay: delayChildren + generateStaggerDuration(i)
    }).then(() => child.notify("AnimationComplete", variant)));
  });
  return Promise.all(animations3);
}
function sortByTreeOrder2(a, b) {
  return a.sortNodePosition(b);
}

// node_modules/motion/dist/es/framer-motion/dist/es/animation/interfaces/visual-element.mjs
function animateVisualElement2(visualElement, definition, options = {}) {
  visualElement.notify("AnimationStart", definition);
  let animation;
  if (Array.isArray(definition)) {
    const animations3 = definition.map((variant) => animateVariant2(visualElement, variant, options));
    animation = Promise.all(animations3);
  } else if (typeof definition === "string") {
    animation = animateVariant2(visualElement, definition, options);
  } else {
    const resolvedDefinition = typeof definition === "function" ? resolveVariant2(visualElement, definition, options.custom) : definition;
    animation = Promise.all(animateTarget2(visualElement, resolvedDefinition, options));
  }
  return animation.then(() => {
    visualElement.notify("AnimationComplete", definition);
  });
}

// node_modules/motion/dist/es/framer-motion/dist/es/utils/shallow-compare.mjs
function shallowCompare2(next, prev) {
  if (!Array.isArray(prev))
    return false;
  const prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (let i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i])
      return false;
  }
  return true;
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/utils/get-variant-context.mjs
var numVariantProps2 = variantProps2.length;
function getVariantContext2(visualElement) {
  if (!visualElement)
    return void 0;
  if (!visualElement.isControllingVariants) {
    const context2 = visualElement.parent ? getVariantContext2(visualElement.parent) || {} : {};
    if (visualElement.props.initial !== void 0) {
      context2.initial = visualElement.props.initial;
    }
    return context2;
  }
  const context = {};
  for (let i = 0; i < numVariantProps2; i++) {
    const name = variantProps2[i];
    const prop = visualElement.props[name];
    if (isVariantLabel2(prop) || prop === false) {
      context[name] = prop;
    }
  }
  return context;
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/utils/animation-state.mjs
var reversePriorityOrder2 = [...variantPriorityOrder2].reverse();
var numAnimationTypes2 = variantPriorityOrder2.length;
function animateList2(visualElement) {
  return (animations3) => Promise.all(animations3.map(({ animation, options }) => animateVisualElement2(visualElement, animation, options)));
}
function createAnimationState2(visualElement) {
  let animate = animateList2(visualElement);
  let state = createState2();
  let isInitialRender = true;
  const buildResolvedTypeValues = (type) => (acc, definition) => {
    const resolved = resolveVariant2(visualElement, definition, type === "exit" ? visualElement.presenceContext?.custom : void 0);
    if (resolved) {
      const { transition, transitionEnd, ...target } = resolved;
      acc = { ...acc, ...target, ...transitionEnd };
    }
    return acc;
  };
  function setAnimateFunction(makeAnimator) {
    animate = makeAnimator(visualElement);
  }
  function animateChanges(changedActiveType) {
    const { props } = visualElement;
    const context = getVariantContext2(visualElement.parent) || {};
    const animations3 = [];
    const removedKeys = /* @__PURE__ */ new Set();
    let encounteredKeys = {};
    let removedVariantIndex = Infinity;
    for (let i = 0; i < numAnimationTypes2; i++) {
      const type = reversePriorityOrder2[i];
      const typeState = state[type];
      const prop = props[type] !== void 0 ? props[type] : context[type];
      const propIsVariant = isVariantLabel2(prop);
      const activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i;
      let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = { ...encounteredKeys };
      if (
        // If it isn't active and hasn't *just* been set as inactive
        !typeState.isActive && activeDelta === null || // If we didn't and don't have any defined prop for this animation type
        !prop && !typeState.prevProp || // Or if the prop doesn't define an animation
        isAnimationControls2(prop) || typeof prop === "boolean"
      ) {
        continue;
      }
      const variantDidChange = checkVariantsDidChange2(typeState.prevProp, prop);
      let shouldAnimateType = variantDidChange || // If we're making this variant active, we want to always make it active
      type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || // If we removed a higher-priority variant (i is in reverse order)
      i > removedVariantIndex && propIsVariant;
      let handledRemovedValues = false;
      const definitionList = Array.isArray(prop) ? prop : [prop];
      let resolvedValues = definitionList.reduce(buildResolvedTypeValues(type), {});
      if (activeDelta === false)
        resolvedValues = {};
      const { prevResolvedValues = {} } = typeState;
      const allKeys = {
        ...prevResolvedValues,
        ...resolvedValues
      };
      const markToAnimate = (key) => {
        shouldAnimateType = true;
        if (removedKeys.has(key)) {
          handledRemovedValues = true;
          removedKeys.delete(key);
        }
        typeState.needsAnimating[key] = true;
        const motionValue3 = visualElement.getValue(key);
        if (motionValue3)
          motionValue3.liveStyle = false;
      };
      for (const key in allKeys) {
        const next = resolvedValues[key];
        const prev = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        let valueHasChanged = false;
        if (isKeyframesTarget2(next) && isKeyframesTarget2(prev)) {
          valueHasChanged = !shallowCompare2(next, prev);
        } else {
          valueHasChanged = next !== prev;
        }
        if (valueHasChanged) {
          if (next !== void 0 && next !== null) {
            markToAnimate(key);
          } else {
            removedKeys.add(key);
          }
        } else if (next !== void 0 && removedKeys.has(key)) {
          markToAnimate(key);
        } else {
          typeState.protectedKeys[key] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = { ...encounteredKeys, ...resolvedValues };
      }
      if (isInitialRender && visualElement.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      const willAnimateViaParent = isInherited && variantDidChange;
      const needsAnimating = !willAnimateViaParent || handledRemovedValues;
      if (shouldAnimateType && needsAnimating) {
        animations3.push(...definitionList.map((animation) => ({
          animation,
          options: { type }
        })));
      }
    }
    if (removedKeys.size) {
      const fallbackAnimation = {};
      if (typeof props.initial !== "boolean") {
        const initialTransition = resolveVariant2(visualElement, Array.isArray(props.initial) ? props.initial[0] : props.initial);
        if (initialTransition && initialTransition.transition) {
          fallbackAnimation.transition = initialTransition.transition;
        }
      }
      removedKeys.forEach((key) => {
        const fallbackTarget = visualElement.getBaseTarget(key);
        const motionValue3 = visualElement.getValue(key);
        if (motionValue3)
          motionValue3.liveStyle = true;
        fallbackAnimation[key] = fallbackTarget ?? null;
      });
      animations3.push({ animation: fallbackAnimation });
    }
    let shouldAnimate = Boolean(animations3.length);
    if (isInitialRender && (props.initial === false || props.initial === props.animate) && !visualElement.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate(animations3) : Promise.resolve();
  }
  function setActive(type, isActive) {
    if (state[type].isActive === isActive)
      return Promise.resolve();
    visualElement.variantChildren?.forEach((child) => child.animationState?.setActive(type, isActive));
    state[type].isActive = isActive;
    const animations3 = animateChanges(type);
    for (const key in state) {
      state[key].protectedKeys = {};
    }
    return animations3;
  }
  return {
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: () => state,
    reset: () => {
      state = createState2();
      isInitialRender = true;
    }
  };
}
function checkVariantsDidChange2(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (Array.isArray(next)) {
    return !shallowCompare2(next, prev);
  }
  return false;
}
function createTypeState2(isActive = false) {
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState2() {
  return {
    animate: createTypeState2(true),
    whileInView: createTypeState2(),
    whileHover: createTypeState2(),
    whileTap: createTypeState2(),
    whileDrag: createTypeState2(),
    whileFocus: createTypeState2(),
    exit: createTypeState2()
  };
}

// node_modules/motion/dist/es/framer-motion/dist/es/motion/features/Feature.mjs
var Feature2 = class {
  constructor(node) {
    this.isMounted = false;
    this.node = node;
  }
  update() {
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/motion/features/animation/index.mjs
var AnimationFeature2 = class extends Feature2 {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(node) {
    super(node);
    node.animationState || (node.animationState = createAnimationState2(node));
  }
  updateAnimationControlsSubscription() {
    const { animate } = this.node.getProps();
    if (isAnimationControls2(animate)) {
      this.unmountControls = animate.subscribe(this.node);
    }
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate } = this.node.getProps();
    const { animate: prevAnimate } = this.node.prevProps || {};
    if (animate !== prevAnimate) {
      this.updateAnimationControlsSubscription();
    }
  }
  unmount() {
    this.node.animationState.reset();
    this.unmountControls?.();
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/motion/features/animation/exit.mjs
var id3 = 0;
var ExitAnimationFeature2 = class extends Feature2 {
  constructor() {
    super(...arguments);
    this.id = id3++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent, onExitComplete } = this.node.presenceContext;
    const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || isPresent === prevIsPresent) {
      return;
    }
    const exitAnimation = this.node.animationState.setActive("exit", !isPresent);
    if (onExitComplete && !isPresent) {
      exitAnimation.then(() => {
        onExitComplete(this.id);
      });
    }
  }
  mount() {
    const { register, onExitComplete } = this.node.presenceContext || {};
    if (onExitComplete) {
      onExitComplete(this.id);
    }
    if (register) {
      this.unmount = register(this.id);
    }
  }
  unmount() {
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/motion/features/animations.mjs
var animations2 = {
  animation: {
    Feature: AnimationFeature2
  },
  exit: {
    Feature: ExitAnimationFeature2
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/events/add-dom-event.mjs
function addDomEvent2(target, eventName, handler, options = { passive: true }) {
  target.addEventListener(eventName, handler, options);
  return () => target.removeEventListener(eventName, handler);
}

// node_modules/motion/dist/es/motion-dom/dist/es/gestures/utils/is-primary-pointer.mjs
var isPrimaryPointer2 = (event) => {
  if (event.pointerType === "mouse") {
    return typeof event.button !== "number" || event.button <= 0;
  } else {
    return event.isPrimary !== false;
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/events/event-info.mjs
function extractEventInfo2(event) {
  return {
    point: {
      x: event.pageX,
      y: event.pageY
    }
  };
}
var addPointerInfo2 = (handler) => {
  return (event) => isPrimaryPointer2(event) && handler(event, extractEventInfo2(event));
};

// node_modules/motion/dist/es/framer-motion/dist/es/events/add-pointer-event.mjs
function addPointerEvent2(target, eventName, handler, options) {
  return addDomEvent2(target, eventName, addPointerInfo2(handler), options);
}

// node_modules/motion/dist/es/framer-motion/dist/es/projection/geometry/conversion.mjs
function convertBoundingBoxToBox2({ top, left, right, bottom }) {
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function convertBoxToBoundingBox2({ x, y }) {
  return { top: y.min, right: x.max, bottom: y.max, left: x.min };
}
function transformBoxPoints2(point, transformPoint3) {
  if (!transformPoint3)
    return point;
  const topLeft = transformPoint3({ x: point.left, y: point.top });
  const bottomRight = transformPoint3({ x: point.right, y: point.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}

// node_modules/motion/dist/es/framer-motion/dist/es/projection/geometry/delta-calc.mjs
var SCALE_PRECISION2 = 1e-4;
var SCALE_MIN2 = 1 - SCALE_PRECISION2;
var SCALE_MAX2 = 1 + SCALE_PRECISION2;
var TRANSLATE_PRECISION2 = 0.01;
var TRANSLATE_MIN2 = 0 - TRANSLATE_PRECISION2;
var TRANSLATE_MAX2 = 0 + TRANSLATE_PRECISION2;
function calcLength2(axis) {
  return axis.max - axis.min;
}
function isNear2(value, target, maxDistance) {
  return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta2(delta, source, target, origin = 0.5) {
  delta.origin = origin;
  delta.originPoint = mixNumber3(source.min, source.max, delta.origin);
  delta.scale = calcLength2(target) / calcLength2(source);
  delta.translate = mixNumber3(target.min, target.max, delta.origin) - delta.originPoint;
  if (delta.scale >= SCALE_MIN2 && delta.scale <= SCALE_MAX2 || isNaN(delta.scale)) {
    delta.scale = 1;
  }
  if (delta.translate >= TRANSLATE_MIN2 && delta.translate <= TRANSLATE_MAX2 || isNaN(delta.translate)) {
    delta.translate = 0;
  }
}
function calcBoxDelta2(delta, source, target, origin) {
  calcAxisDelta2(delta.x, source.x, target.x, origin ? origin.originX : void 0);
  calcAxisDelta2(delta.y, source.y, target.y, origin ? origin.originY : void 0);
}
function calcRelativeAxis2(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength2(relative);
}
function calcRelativeBox2(target, relative, parent) {
  calcRelativeAxis2(target.x, relative.x, parent.x);
  calcRelativeAxis2(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition2(target, layout3, parent) {
  target.min = layout3.min - parent.min;
  target.max = target.min + calcLength2(layout3);
}
function calcRelativePosition2(target, layout3, parent) {
  calcRelativeAxisPosition2(target.x, layout3.x, parent.x);
  calcRelativeAxisPosition2(target.y, layout3.y, parent.y);
}

// node_modules/motion/dist/es/framer-motion/dist/es/projection/geometry/models.mjs
var createAxisDelta2 = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
});
var createDelta2 = () => ({
  x: createAxisDelta2(),
  y: createAxisDelta2()
});
var createAxis2 = () => ({ min: 0, max: 0 });
var createBox2 = () => ({
  x: createAxis2(),
  y: createAxis2()
});

// node_modules/motion/dist/es/framer-motion/dist/es/projection/utils/each-axis.mjs
function eachAxis2(callback) {
  return [callback("x"), callback("y")];
}

// node_modules/motion/dist/es/framer-motion/dist/es/projection/utils/has-transform.mjs
function isIdentityScale2(scale3) {
  return scale3 === void 0 || scale3 === 1;
}
function hasScale2({ scale: scale3, scaleX: scaleX3, scaleY: scaleY3 }) {
  return !isIdentityScale2(scale3) || !isIdentityScale2(scaleX3) || !isIdentityScale2(scaleY3);
}
function hasTransform2(values) {
  return hasScale2(values) || has2DTranslate2(values) || values.z || values.rotate || values.rotateX || values.rotateY || values.skewX || values.skewY;
}
function has2DTranslate2(values) {
  return is2DTranslate2(values.x) || is2DTranslate2(values.y);
}
function is2DTranslate2(value) {
  return value && value !== "0%";
}

// node_modules/motion/dist/es/framer-motion/dist/es/projection/geometry/delta-apply.mjs
function scalePoint2(point, scale3, originPoint) {
  const distanceFromOrigin = point - originPoint;
  const scaled = scale3 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta2(point, translate, scale3, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point = scalePoint2(point, boxScale, originPoint);
  }
  return scalePoint2(point, scale3, originPoint) + translate;
}
function applyAxisDelta2(axis, translate = 0, scale3 = 1, originPoint, boxScale) {
  axis.min = applyPointDelta2(axis.min, translate, scale3, originPoint, boxScale);
  axis.max = applyPointDelta2(axis.max, translate, scale3, originPoint, boxScale);
}
function applyBoxDelta2(box, { x, y }) {
  applyAxisDelta2(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta2(box.y, y.translate, y.scale, y.originPoint);
}
var TREE_SCALE_SNAP_MIN2 = 0.999999999999;
var TREE_SCALE_SNAP_MAX2 = 1.0000000000001;
function applyTreeDeltas2(box, treeScale, treePath, isSharedTransition = false) {
  const treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  let node;
  let delta;
  for (let i = 0; i < treeLength; i++) {
    node = treePath[i];
    delta = node.projectionDelta;
    const { visualElement } = node.options;
    if (visualElement && visualElement.props.style && visualElement.props.style.display === "contents") {
      continue;
    }
    if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
      transformBox2(box, {
        x: -node.scroll.offset.x,
        y: -node.scroll.offset.y
      });
    }
    if (delta) {
      treeScale.x *= delta.x.scale;
      treeScale.y *= delta.y.scale;
      applyBoxDelta2(box, delta);
    }
    if (isSharedTransition && hasTransform2(node.latestValues)) {
      transformBox2(box, node.latestValues);
    }
  }
  if (treeScale.x < TREE_SCALE_SNAP_MAX2 && treeScale.x > TREE_SCALE_SNAP_MIN2) {
    treeScale.x = 1;
  }
  if (treeScale.y < TREE_SCALE_SNAP_MAX2 && treeScale.y > TREE_SCALE_SNAP_MIN2) {
    treeScale.y = 1;
  }
}
function translateAxis2(axis, distance3) {
  axis.min = axis.min + distance3;
  axis.max = axis.max + distance3;
}
function transformAxis2(axis, axisTranslate, axisScale, boxScale, axisOrigin = 0.5) {
  const originPoint = mixNumber3(axis.min, axis.max, axisOrigin);
  applyAxisDelta2(axis, axisTranslate, axisScale, originPoint, boxScale);
}
function transformBox2(box, transform) {
  transformAxis2(box.x, transform.x, transform.scaleX, transform.scale, transform.originX);
  transformAxis2(box.y, transform.y, transform.scaleY, transform.scale, transform.originY);
}

// node_modules/motion/dist/es/framer-motion/dist/es/projection/utils/measure.mjs
function measureViewportBox2(instance, transformPoint3) {
  return convertBoundingBoxToBox2(transformBoxPoints2(instance.getBoundingClientRect(), transformPoint3));
}
function measurePageBox2(element, rootProjectionNode3, transformPagePoint) {
  const viewportBox = measureViewportBox2(element, transformPagePoint);
  const { scroll } = rootProjectionNode3;
  if (scroll) {
    translateAxis2(viewportBox.x, scroll.offset.x);
    translateAxis2(viewportBox.y, scroll.offset.y);
  }
  return viewportBox;
}

// node_modules/motion/dist/es/framer-motion/dist/es/utils/get-context-window.mjs
var getContextWindow2 = ({ current }) => {
  return current ? current.ownerDocument.defaultView : null;
};

// node_modules/motion/dist/es/framer-motion/dist/es/utils/distance.mjs
var distance2 = (a, b) => Math.abs(a - b);
function distance2D2(a, b) {
  const xDelta = distance2(a.x, b.x);
  const yDelta = distance2(a.y, b.y);
  return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}

// node_modules/motion/dist/es/framer-motion/dist/es/gestures/pan/PanSession.mjs
var PanSession2 = class {
  constructor(event, handlers, { transformPagePoint, contextWindow, dragSnapToOrigin = false } = {}) {
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.contextWindow = window;
    this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const info2 = getPanInfo2(this.lastMoveEventInfo, this.history);
      const isPanStarted = this.startEvent !== null;
      const isDistancePastThreshold = distance2D2(info2.offset, { x: 0, y: 0 }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      const { point: point2 } = info2;
      const { timestamp: timestamp2 } = frameData2;
      this.history.push({ ...point2, timestamp: timestamp2 });
      const { onStart, onMove } = this.handlers;
      if (!isPanStarted) {
        onStart && onStart(this.lastMoveEvent, info2);
        this.startEvent = this.lastMoveEvent;
      }
      onMove && onMove(this.lastMoveEvent, info2);
    };
    this.handlePointerMove = (event2, info2) => {
      this.lastMoveEvent = event2;
      this.lastMoveEventInfo = transformPoint2(info2, this.transformPagePoint);
      frame2.update(this.updatePoint, true);
    };
    this.handlePointerUp = (event2, info2) => {
      this.end();
      const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
      if (this.dragSnapToOrigin)
        resumeAnimation && resumeAnimation();
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const panInfo = getPanInfo2(event2.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint2(info2, this.transformPagePoint), this.history);
      if (this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (!isPrimaryPointer2(event))
      return;
    this.dragSnapToOrigin = dragSnapToOrigin;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    this.contextWindow = contextWindow || window;
    const info = extractEventInfo2(event);
    const initialInfo = transformPoint2(info, this.transformPagePoint);
    const { point } = initialInfo;
    const { timestamp } = frameData2;
    this.history = [{ ...point, timestamp }];
    const { onSessionStart } = handlers;
    onSessionStart && onSessionStart(event, getPanInfo2(initialInfo, this.history));
    this.removeListeners = pipe2(addPointerEvent2(this.contextWindow, "pointermove", this.handlePointerMove), addPointerEvent2(this.contextWindow, "pointerup", this.handlePointerUp), addPointerEvent2(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(handlers) {
    this.handlers = handlers;
  }
  end() {
    this.removeListeners && this.removeListeners();
    cancelFrame2(this.updatePoint);
  }
};
function transformPoint2(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint2(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}
function getPanInfo2({ point }, history) {
  return {
    point,
    delta: subtractPoint2(point, lastDevicePoint2(history)),
    offset: subtractPoint2(point, startDevicePoint2(history)),
    velocity: getVelocity2(history, 0.1)
  };
}
function startDevicePoint2(history) {
  return history[0];
}
function lastDevicePoint2(history) {
  return history[history.length - 1];
}
function getVelocity2(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  let i = history.length - 1;
  let timestampedPoint = null;
  const lastPoint = lastDevicePoint2(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds2(timeDelta)) {
      break;
    }
    i--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  const time3 = millisecondsToSeconds2(lastPoint.timestamp - timestampedPoint.timestamp);
  if (time3 === 0) {
    return { x: 0, y: 0 };
  }
  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time3,
    y: (lastPoint.y - timestampedPoint.y) / time3
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}

// node_modules/motion/dist/es/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
function applyConstraints2(point, { min, max }, elastic) {
  if (min !== void 0 && point < min) {
    point = elastic ? mixNumber3(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== void 0 && point > max) {
    point = elastic ? mixNumber3(max, point, elastic.max) : Math.min(point, max);
  }
  return point;
}
function calcRelativeAxisConstraints2(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints2(layoutBox, { top, left, bottom, right }) {
  return {
    x: calcRelativeAxisConstraints2(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints2(layoutBox.y, top, bottom)
  };
}
function calcViewportAxisConstraints2(layoutAxis, constraintsAxis) {
  let min = constraintsAxis.min - layoutAxis.min;
  let max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    [min, max] = [max, min];
  }
  return { min, max };
}
function calcViewportConstraints2(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints2(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints2(layoutBox.y, constraintsBox.y)
  };
}
function calcOrigin2(source, target) {
  let origin = 0.5;
  const sourceLength = calcLength2(source);
  const targetLength = calcLength2(target);
  if (targetLength > sourceLength) {
    origin = progress2(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress2(source.min, source.max - targetLength, target.min);
  }
  return clamp2(0, 1, origin);
}
function rebaseAxisConstraints2(layout3, constraints) {
  const relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout3.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout3.min;
  }
  return relativeConstraints;
}
var defaultElastic2 = 0.35;
function resolveDragElastic2(dragElastic = defaultElastic2) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic2;
  }
  return {
    x: resolveAxisElastic2(dragElastic, "left", "right"),
    y: resolveAxisElastic2(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic2(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic2(dragElastic, minLabel),
    max: resolvePointElastic2(dragElastic, maxLabel)
  };
}
function resolvePointElastic2(dragElastic, label) {
  return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}

// node_modules/motion/dist/es/motion-dom/dist/es/gestures/drag/state/is-active.mjs
var isDragging2 = {
  x: false,
  y: false
};
function isDragActive2() {
  return isDragging2.x || isDragging2.y;
}

// node_modules/motion/dist/es/motion-dom/dist/es/gestures/drag/state/set-active.mjs
function setDragLock2(axis) {
  if (axis === "x" || axis === "y") {
    if (isDragging2[axis]) {
      return null;
    } else {
      isDragging2[axis] = true;
      return () => {
        isDragging2[axis] = false;
      };
    }
  } else {
    if (isDragging2.x || isDragging2.y) {
      return null;
    } else {
      isDragging2.x = isDragging2.y = true;
      return () => {
        isDragging2.x = isDragging2.y = false;
      };
    }
  }
}

// node_modules/motion/dist/es/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
var elementDragControls2 = /* @__PURE__ */ new WeakMap();
var VisualElementDragControls2 = class {
  constructor(visualElement) {
    this.openDragLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = { x: 0, y: 0 };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox2();
    this.visualElement = visualElement;
  }
  start(originEvent, { snapToCursor = false } = {}) {
    const { presenceContext } = this.visualElement;
    if (presenceContext && presenceContext.isPresent === false)
      return;
    const onSessionStart = (event) => {
      const { dragSnapToOrigin: dragSnapToOrigin2 } = this.getProps();
      dragSnapToOrigin2 ? this.pauseAnimation() : this.stopAnimation();
      if (snapToCursor) {
        this.snapToCursor(extractEventInfo2(event).point);
      }
    };
    const onStart = (event, info) => {
      const { drag: drag3, dragPropagation, onDragStart } = this.getProps();
      if (drag3 && !dragPropagation) {
        if (this.openDragLock)
          this.openDragLock();
        this.openDragLock = setDragLock2(drag3);
        if (!this.openDragLock)
          return;
      }
      this.isDragging = true;
      this.currentDirection = null;
      this.resolveConstraints();
      if (this.visualElement.projection) {
        this.visualElement.projection.isAnimationBlocked = true;
        this.visualElement.projection.target = void 0;
      }
      eachAxis2((axis) => {
        let current = this.getAxisMotionValue(axis).get() || 0;
        if (percent2.test(current)) {
          const { projection } = this.visualElement;
          if (projection && projection.layout) {
            const measuredAxis = projection.layout.layoutBox[axis];
            if (measuredAxis) {
              const length = calcLength2(measuredAxis);
              current = length * (parseFloat(current) / 100);
            }
          }
        }
        this.originPoint[axis] = current;
      });
      if (onDragStart) {
        frame2.postRender(() => onDragStart(event, info));
      }
      addValueToWillChange2(this.visualElement, "transform");
      const { animationState } = this.visualElement;
      animationState && animationState.setActive("whileDrag", true);
    };
    const onMove = (event, info) => {
      const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
      if (!dragPropagation && !this.openDragLock)
        return;
      const { offset } = info;
      if (dragDirectionLock && this.currentDirection === null) {
        this.currentDirection = getCurrentDirection2(offset);
        if (this.currentDirection !== null) {
          onDirectionLock && onDirectionLock(this.currentDirection);
        }
        return;
      }
      this.updateAxis("x", info.point, offset);
      this.updateAxis("y", info.point, offset);
      this.visualElement.render();
      onDrag && onDrag(event, info);
    };
    const onSessionEnd = (event, info) => this.stop(event, info);
    const resumeAnimation = () => eachAxis2((axis) => this.getAnimationState(axis) === "paused" && this.getAxisMotionValue(axis).animation?.play());
    const { dragSnapToOrigin } = this.getProps();
    this.panSession = new PanSession2(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd,
      resumeAnimation
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin,
      contextWindow: getContextWindow2(this.visualElement)
    });
  }
  stop(event, info) {
    const isDragging3 = this.isDragging;
    this.cancel();
    if (!isDragging3)
      return;
    const { velocity } = info;
    this.startAnimation(velocity);
    const { onDragEnd } = this.getProps();
    if (onDragEnd) {
      frame2.postRender(() => onDragEnd(event, info));
    }
  }
  cancel() {
    this.isDragging = false;
    const { projection, animationState } = this.visualElement;
    if (projection) {
      projection.isAnimationBlocked = false;
    }
    this.panSession && this.panSession.end();
    this.panSession = void 0;
    const { dragPropagation } = this.getProps();
    if (!dragPropagation && this.openDragLock) {
      this.openDragLock();
      this.openDragLock = null;
    }
    animationState && animationState.setActive("whileDrag", false);
  }
  updateAxis(axis, _point, offset) {
    const { drag: drag3 } = this.getProps();
    if (!offset || !shouldDrag2(axis, drag3, this.currentDirection))
      return;
    const axisValue = this.getAxisMotionValue(axis);
    let next = this.originPoint[axis] + offset[axis];
    if (this.constraints && this.constraints[axis]) {
      next = applyConstraints2(next, this.constraints[axis], this.elastic[axis]);
    }
    axisValue.set(next);
  }
  resolveConstraints() {
    const { dragConstraints, dragElastic } = this.getProps();
    const layout3 = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : this.visualElement.projection?.layout;
    const prevConstraints = this.constraints;
    if (dragConstraints && isRefObject2(dragConstraints)) {
      if (!this.constraints) {
        this.constraints = this.resolveRefConstraints();
      }
    } else {
      if (dragConstraints && layout3) {
        this.constraints = calcRelativeConstraints2(layout3.layoutBox, dragConstraints);
      } else {
        this.constraints = false;
      }
    }
    this.elastic = resolveDragElastic2(dragElastic);
    if (prevConstraints !== this.constraints && layout3 && this.constraints && !this.hasMutatedConstraints) {
      eachAxis2((axis) => {
        if (this.constraints !== false && this.getAxisMotionValue(axis)) {
          this.constraints[axis] = rebaseAxisConstraints2(layout3.layoutBox[axis], this.constraints[axis]);
        }
      });
    }
  }
  resolveRefConstraints() {
    const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
    if (!constraints || !isRefObject2(constraints))
      return false;
    const constraintsElement = constraints.current;
    invariant2(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
    const { projection } = this.visualElement;
    if (!projection || !projection.layout)
      return false;
    const constraintsBox = measurePageBox2(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
    let measuredConstraints = calcViewportConstraints2(projection.layout.layoutBox, constraintsBox);
    if (onMeasureDragConstraints) {
      const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox2(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToBox2(userConstraints);
      }
    }
    return measuredConstraints;
  }
  startAnimation(velocity) {
    const { drag: drag3, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
    const constraints = this.constraints || {};
    const momentumAnimations = eachAxis2((axis) => {
      if (!shouldDrag2(axis, drag3, this.currentDirection)) {
        return;
      }
      let transition = constraints && constraints[axis] || {};
      if (dragSnapToOrigin)
        transition = { min: 0, max: 0 };
      const bounceStiffness = dragElastic ? 200 : 1e6;
      const bounceDamping = dragElastic ? 40 : 1e7;
      const inertia3 = {
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...dragTransition,
        ...transition
      };
      return this.startAxisValueAnimation(axis, inertia3);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  }
  startAxisValueAnimation(axis, transition) {
    const axisValue = this.getAxisMotionValue(axis);
    addValueToWillChange2(this.visualElement, axis);
    return axisValue.start(animateMotionValue2(axis, axisValue, 0, transition, this.visualElement, false));
  }
  stopAnimation() {
    eachAxis2((axis) => this.getAxisMotionValue(axis).stop());
  }
  pauseAnimation() {
    eachAxis2((axis) => this.getAxisMotionValue(axis).animation?.pause());
  }
  getAnimationState(axis) {
    return this.getAxisMotionValue(axis).animation?.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(axis) {
    const dragKey = `_drag${axis.toUpperCase()}`;
    const props = this.visualElement.getProps();
    const externalMotionValue = props[dragKey];
    return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (props.initial ? props.initial[axis] : void 0) || 0);
  }
  snapToCursor(point) {
    eachAxis2((axis) => {
      const { drag: drag3 } = this.getProps();
      if (!shouldDrag2(axis, drag3, this.currentDirection))
        return;
      const { projection } = this.visualElement;
      const axisValue = this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        const { min, max } = projection.layout.layoutBox[axis];
        axisValue.set(point[axis] - mixNumber3(min, max, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: drag3, dragConstraints } = this.getProps();
    const { projection } = this.visualElement;
    if (!isRefObject2(dragConstraints) || !projection || !this.constraints)
      return;
    this.stopAnimation();
    const boxProgress = { x: 0, y: 0 };
    eachAxis2((axis) => {
      const axisValue = this.getAxisMotionValue(axis);
      if (axisValue && this.constraints !== false) {
        const latest = axisValue.get();
        boxProgress[axis] = calcOrigin2({ min: latest, max: latest }, this.constraints[axis]);
      }
    });
    const { transformTemplate } = this.visualElement.getProps();
    this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    projection.root && projection.root.updateScroll();
    projection.updateLayout();
    this.resolveConstraints();
    eachAxis2((axis) => {
      if (!shouldDrag2(axis, drag3, null))
        return;
      const axisValue = this.getAxisMotionValue(axis);
      const { min, max } = this.constraints[axis];
      axisValue.set(mixNumber3(min, max, boxProgress[axis]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    elementDragControls2.set(this.visualElement, this);
    const element = this.visualElement.current;
    const stopPointerListener = addPointerEvent2(element, "pointerdown", (event) => {
      const { drag: drag3, dragListener = true } = this.getProps();
      drag3 && dragListener && this.start(event);
    });
    const measureDragConstraints = () => {
      const { dragConstraints } = this.getProps();
      if (isRefObject2(dragConstraints) && dragConstraints.current) {
        this.constraints = this.resolveRefConstraints();
      }
    };
    const { projection } = this.visualElement;
    const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
    if (projection && !projection.layout) {
      projection.root && projection.root.updateScroll();
      projection.updateLayout();
    }
    frame2.read(measureDragConstraints);
    const stopResizeListener = addDomEvent2(window, "resize", () => this.scalePositionWithinConstraints());
    const stopLayoutUpdateListener = projection.addEventListener("didUpdate", ({ delta, hasLayoutChanged }) => {
      if (this.isDragging && hasLayoutChanged) {
        eachAxis2((axis) => {
          const motionValue3 = this.getAxisMotionValue(axis);
          if (!motionValue3)
            return;
          this.originPoint[axis] += delta[axis].translate;
          motionValue3.set(motionValue3.get() + delta[axis].translate);
        });
        this.visualElement.render();
      }
    });
    return () => {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
      stopLayoutUpdateListener && stopLayoutUpdateListener();
    };
  }
  getProps() {
    const props = this.visualElement.getProps();
    const { drag: drag3 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic2, dragMomentum = true } = props;
    return {
      ...props,
      drag: drag3,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    };
  }
};
function shouldDrag2(direction, drag3, currentDirection) {
  return (drag3 === true || drag3 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection2(offset, lockThreshold = 10) {
  let direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}

// node_modules/motion/dist/es/framer-motion/dist/es/gestures/drag/index.mjs
var DragGesture2 = class extends Feature2 {
  constructor(node) {
    super(node);
    this.removeGroupControls = noop2;
    this.removeListeners = noop2;
    this.controls = new VisualElementDragControls2(node);
  }
  mount() {
    const { dragControls } = this.node.getProps();
    if (dragControls) {
      this.removeGroupControls = dragControls.subscribe(this.controls);
    }
    this.removeListeners = this.controls.addListeners() || noop2;
  }
  unmount() {
    this.removeGroupControls();
    this.removeListeners();
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/gestures/pan/index.mjs
var asyncHandler2 = (handler) => (event, info) => {
  if (handler) {
    frame2.postRender(() => handler(event, info));
  }
};
var PanGesture2 = class extends Feature2 {
  constructor() {
    super(...arguments);
    this.removePointerDownListener = noop2;
  }
  onPointerDown(pointerDownEvent) {
    this.session = new PanSession2(pointerDownEvent, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: getContextWindow2(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
    return {
      onSessionStart: asyncHandler2(onPanSessionStart),
      onStart: asyncHandler2(onPanStart),
      onMove: onPan,
      onEnd: (event, info) => {
        delete this.session;
        if (onPanEnd) {
          frame2.postRender(() => onPanEnd(event, info));
        }
      }
    };
  }
  mount() {
    this.removePointerDownListener = addPointerEvent2(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener();
    this.session && this.session.end();
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var import_react38 = __toESM(require_react(), 1);

// node_modules/motion/dist/es/framer-motion/dist/es/projection/node/state.mjs
var globalProjectionState2 = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: true,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: false
};

// node_modules/motion/dist/es/framer-motion/dist/es/projection/styles/scale-border-radius.mjs
function pixelsToPercent2(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
var correctBorderRadius2 = {
  correct: (latest, node) => {
    if (!node.target)
      return latest;
    if (typeof latest === "string") {
      if (px2.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    const x = pixelsToPercent2(latest, node.target.x);
    const y = pixelsToPercent2(latest, node.target.y);
    return `${x}% ${y}%`;
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/projection/styles/scale-box-shadow.mjs
var correctBoxShadow2 = {
  correct: (latest, { treeScale, projectionDelta }) => {
    const original = latest;
    const shadow = complex2.parse(latest);
    if (shadow.length > 5)
      return original;
    const template = complex2.createTransformer(latest);
    const offset = typeof shadow[0] !== "number" ? 1 : 0;
    const xScale = projectionDelta.x.scale * treeScale.x;
    const yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    const averageScale = mixNumber3(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset] === "number")
      shadow[2 + offset] /= averageScale;
    if (typeof shadow[3 + offset] === "number")
      shadow[3 + offset] /= averageScale;
    return template(shadow);
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
"use client";
var MeasureLayoutWithContext2 = class extends import_react38.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
    const { projection } = visualElement;
    addScaleCorrector2(defaultScaleCorrectors2);
    if (projection) {
      if (layoutGroup.group)
        layoutGroup.group.add(projection);
      if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
        switchLayoutGroup.register(projection);
      }
      projection.root.didUpdate();
      projection.addEventListener("animationComplete", () => {
        this.safeToRemove();
      });
      projection.setOptions({
        ...projection.options,
        onExitComplete: () => this.safeToRemove()
      });
    }
    globalProjectionState2.hasEverUpdated = true;
  }
  getSnapshotBeforeUpdate(prevProps) {
    const { layoutDependency, visualElement, drag: drag3, isPresent } = this.props;
    const projection = visualElement.projection;
    if (!projection)
      return null;
    projection.isPresent = isPresent;
    if (drag3 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0 || prevProps.isPresent !== isPresent) {
      projection.willUpdate();
    } else {
      this.safeToRemove();
    }
    if (prevProps.isPresent !== isPresent) {
      if (isPresent) {
        projection.promote();
      } else if (!projection.relegate()) {
        frame2.postRender(() => {
          const stack = projection.getStack();
          if (!stack || !stack.members.length) {
            this.safeToRemove();
          }
        });
      }
    }
    return null;
  }
  componentDidUpdate() {
    const { projection } = this.props.visualElement;
    if (projection) {
      projection.root.didUpdate();
      microtask2.postRender(() => {
        if (!projection.currentAnimation && projection.isLead()) {
          this.safeToRemove();
        }
      });
    }
  }
  componentWillUnmount() {
    const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
    const { projection } = visualElement;
    if (projection) {
      projection.scheduleCheckAfterUnmount();
      if (layoutGroup && layoutGroup.group)
        layoutGroup.group.remove(projection);
      if (promoteContext && promoteContext.deregister)
        promoteContext.deregister(projection);
    }
  }
  safeToRemove() {
    const { safeToRemove } = this.props;
    safeToRemove && safeToRemove();
  }
  render() {
    return null;
  }
};
function MeasureLayout2(props) {
  const [isPresent, safeToRemove] = usePresence2();
  const layoutGroup = (0, import_react38.useContext)(LayoutGroupContext2);
  return (0, import_jsx_runtime4.jsx)(MeasureLayoutWithContext2, { ...props, layoutGroup, switchLayoutGroup: (0, import_react38.useContext)(SwitchLayoutGroupContext2), isPresent, safeToRemove });
}
var defaultScaleCorrectors2 = {
  borderRadius: {
    ...correctBorderRadius2,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: correctBorderRadius2,
  borderTopRightRadius: correctBorderRadius2,
  borderBottomLeftRadius: correctBorderRadius2,
  borderBottomRightRadius: correctBorderRadius2,
  boxShadow: correctBoxShadow2
};

// node_modules/motion/dist/es/framer-motion/dist/es/animation/animate/single-value.mjs
function animateSingleValue2(value, keyframes3, options) {
  const motionValue$1 = isMotionValue2(value) ? value : motionValue2(value);
  motionValue$1.start(animateMotionValue2("", motionValue$1, keyframes3, options));
  return motionValue$1.animation;
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/dom/utils/is-svg-element.mjs
function isSVGElement2(element) {
  return element instanceof SVGElement && element.tagName !== "svg";
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/utils/compare-by-depth.mjs
var compareByDepth2 = (a, b) => a.depth - b.depth;

// node_modules/motion/dist/es/framer-motion/dist/es/render/utils/flat-tree.mjs
var FlatTree2 = class {
  constructor() {
    this.children = [];
    this.isDirty = false;
  }
  add(child) {
    addUniqueItem2(this.children, child);
    this.isDirty = true;
  }
  remove(child) {
    removeItem2(this.children, child);
    this.isDirty = true;
  }
  forEach(callback) {
    this.isDirty && this.children.sort(compareByDepth2);
    this.isDirty = false;
    this.children.forEach(callback);
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/utils/delay.mjs
function delay2(callback, timeout) {
  const start = time2.now();
  const checkElapsed = ({ timestamp }) => {
    const elapsed = timestamp - start;
    if (elapsed >= timeout) {
      cancelFrame2(checkElapsed);
      callback(elapsed - timeout);
    }
  };
  frame2.setup(checkElapsed, true);
  return () => cancelFrame2(checkElapsed);
}

// node_modules/motion/dist/es/framer-motion/dist/es/projection/animation/mix-values.mjs
var borders2 = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
var numBorders2 = borders2.length;
var asNumber2 = (value) => typeof value === "string" ? parseFloat(value) : value;
var isPx2 = (value) => typeof value === "number" || px2.test(value);
function mixValues2(target, follow, lead, progress3, shouldCrossfadeOpacity, isOnlyMember) {
  if (shouldCrossfadeOpacity) {
    target.opacity = mixNumber3(0, lead.opacity ?? 1, easeCrossfadeIn2(progress3));
    target.opacityExit = mixNumber3(follow.opacity ?? 1, 0, easeCrossfadeOut2(progress3));
  } else if (isOnlyMember) {
    target.opacity = mixNumber3(follow.opacity ?? 1, lead.opacity ?? 1, progress3);
  }
  for (let i = 0; i < numBorders2; i++) {
    const borderLabel = `border${borders2[i]}Radius`;
    let followRadius = getRadius2(follow, borderLabel);
    let leadRadius = getRadius2(lead, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0)
      continue;
    followRadius || (followRadius = 0);
    leadRadius || (leadRadius = 0);
    const canMix = followRadius === 0 || leadRadius === 0 || isPx2(followRadius) === isPx2(leadRadius);
    if (canMix) {
      target[borderLabel] = Math.max(mixNumber3(asNumber2(followRadius), asNumber2(leadRadius), progress3), 0);
      if (percent2.test(leadRadius) || percent2.test(followRadius)) {
        target[borderLabel] += "%";
      }
    } else {
      target[borderLabel] = leadRadius;
    }
  }
  if (follow.rotate || lead.rotate) {
    target.rotate = mixNumber3(follow.rotate || 0, lead.rotate || 0, progress3);
  }
}
function getRadius2(values, radiusName) {
  return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
}
var easeCrossfadeIn2 = /* @__PURE__ */ compress2(0, 0.5, circOut2);
var easeCrossfadeOut2 = /* @__PURE__ */ compress2(0.5, 0.95, noop2);
function compress2(min, max, easing) {
  return (p) => {
    if (p < min)
      return 0;
    if (p > max)
      return 1;
    return easing(progress2(min, max, p));
  };
}

// node_modules/motion/dist/es/framer-motion/dist/es/projection/geometry/copy.mjs
function copyAxisInto2(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function copyBoxInto2(box, originBox) {
  copyAxisInto2(box.x, originBox.x);
  copyAxisInto2(box.y, originBox.y);
}
function copyAxisDeltaInto2(delta, originDelta) {
  delta.translate = originDelta.translate;
  delta.scale = originDelta.scale;
  delta.originPoint = originDelta.originPoint;
  delta.origin = originDelta.origin;
}

// node_modules/motion/dist/es/framer-motion/dist/es/projection/geometry/delta-remove.mjs
function removePointDelta2(point, translate, scale3, originPoint, boxScale) {
  point -= translate;
  point = scalePoint2(point, 1 / scale3, originPoint);
  if (boxScale !== void 0) {
    point = scalePoint2(point, 1 / boxScale, originPoint);
  }
  return point;
}
function removeAxisDelta2(axis, translate = 0, scale3 = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
  if (percent2.test(translate)) {
    translate = parseFloat(translate);
    const relativeProgress = mixNumber3(sourceAxis.min, sourceAxis.max, translate / 100);
    translate = relativeProgress - sourceAxis.min;
  }
  if (typeof translate !== "number")
    return;
  let originPoint = mixNumber3(originAxis.min, originAxis.max, origin);
  if (axis === originAxis)
    originPoint -= translate;
  axis.min = removePointDelta2(axis.min, translate, scale3, originPoint, boxScale);
  axis.max = removePointDelta2(axis.max, translate, scale3, originPoint, boxScale);
}
function removeAxisTransforms2(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
  removeAxisDelta2(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
var xKeys2 = ["x", "scaleX", "originX"];
var yKeys2 = ["y", "scaleY", "originY"];
function removeBoxTransforms2(box, transforms, originBox, sourceBox) {
  removeAxisTransforms2(box.x, transforms, xKeys2, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
  removeAxisTransforms2(box.y, transforms, yKeys2, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
}

// node_modules/motion/dist/es/framer-motion/dist/es/projection/geometry/utils.mjs
function isAxisDeltaZero2(delta) {
  return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero2(delta) {
  return isAxisDeltaZero2(delta.x) && isAxisDeltaZero2(delta.y);
}
function axisEquals2(a, b) {
  return a.min === b.min && a.max === b.max;
}
function boxEquals2(a, b) {
  return axisEquals2(a.x, b.x) && axisEquals2(a.y, b.y);
}
function axisEqualsRounded2(a, b) {
  return Math.round(a.min) === Math.round(b.min) && Math.round(a.max) === Math.round(b.max);
}
function boxEqualsRounded2(a, b) {
  return axisEqualsRounded2(a.x, b.x) && axisEqualsRounded2(a.y, b.y);
}
function aspectRatio2(box) {
  return calcLength2(box.x) / calcLength2(box.y);
}
function axisDeltaEquals2(a, b) {
  return a.translate === b.translate && a.scale === b.scale && a.originPoint === b.originPoint;
}

// node_modules/motion/dist/es/framer-motion/dist/es/projection/shared/stack.mjs
var NodeStack2 = class {
  constructor() {
    this.members = [];
  }
  add(node) {
    addUniqueItem2(this.members, node);
    node.scheduleRender();
  }
  remove(node) {
    removeItem2(this.members, node);
    if (node === this.prevLead) {
      this.prevLead = void 0;
    }
    if (node === this.lead) {
      const prevLead = this.members[this.members.length - 1];
      if (prevLead) {
        this.promote(prevLead);
      }
    }
  }
  relegate(node) {
    const indexOfNode = this.members.findIndex((member) => node === member);
    if (indexOfNode === 0)
      return false;
    let prevLead;
    for (let i = indexOfNode; i >= 0; i--) {
      const member = this.members[i];
      if (member.isPresent !== false) {
        prevLead = member;
        break;
      }
    }
    if (prevLead) {
      this.promote(prevLead);
      return true;
    } else {
      return false;
    }
  }
  promote(node, preserveFollowOpacity) {
    const prevLead = this.lead;
    if (node === prevLead)
      return;
    this.prevLead = prevLead;
    this.lead = node;
    node.show();
    if (prevLead) {
      prevLead.instance && prevLead.scheduleRender();
      node.scheduleRender();
      node.resumeFrom = prevLead;
      if (preserveFollowOpacity) {
        node.resumeFrom.preserveOpacity = true;
      }
      if (prevLead.snapshot) {
        node.snapshot = prevLead.snapshot;
        node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
      }
      if (node.root && node.root.isUpdating) {
        node.isLayoutDirty = true;
      }
      const { crossfade } = node.options;
      if (crossfade === false) {
        prevLead.hide();
      }
    }
  }
  exitAnimationComplete() {
    this.members.forEach((node) => {
      const { options, resumingFrom } = node;
      options.onExitComplete && options.onExitComplete();
      if (resumingFrom) {
        resumingFrom.options.onExitComplete && resumingFrom.options.onExitComplete();
      }
    });
  }
  scheduleRender() {
    this.members.forEach((node) => {
      node.instance && node.scheduleRender(false);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    if (this.lead && this.lead.snapshot) {
      this.lead.snapshot = void 0;
    }
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/projection/styles/transform.mjs
function buildProjectionTransform2(delta, treeScale, latestTransform) {
  let transform = "";
  const xTranslate = delta.x.translate / treeScale.x;
  const yTranslate = delta.y.translate / treeScale.y;
  const zTranslate = latestTransform?.z || 0;
  if (xTranslate || yTranslate || zTranslate) {
    transform = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `;
  }
  if (treeScale.x !== 1 || treeScale.y !== 1) {
    transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
  }
  if (latestTransform) {
    const { transformPerspective, rotate: rotate3, rotateX, rotateY, skewX, skewY } = latestTransform;
    if (transformPerspective)
      transform = `perspective(${transformPerspective}px) ${transform}`;
    if (rotate3)
      transform += `rotate(${rotate3}deg) `;
    if (rotateX)
      transform += `rotateX(${rotateX}deg) `;
    if (rotateY)
      transform += `rotateY(${rotateY}deg) `;
    if (skewX)
      transform += `skewX(${skewX}deg) `;
    if (skewY)
      transform += `skewY(${skewY}deg) `;
  }
  const elementScaleX = delta.x.scale * treeScale.x;
  const elementScaleY = delta.y.scale * treeScale.y;
  if (elementScaleX !== 1 || elementScaleY !== 1) {
    transform += `scale(${elementScaleX}, ${elementScaleY})`;
  }
  return transform || "none";
}

// node_modules/motion/dist/es/framer-motion/dist/es/projection/node/create-projection-node.mjs
var metrics2 = {
  nodes: 0,
  calculatedTargetDeltas: 0,
  calculatedProjections: 0
};
var transformAxes2 = ["", "X", "Y", "Z"];
var hiddenVisibility2 = { visibility: "hidden" };
var animationTarget2 = 1e3;
var id4 = 0;
function resetDistortingTransform2(key, visualElement, values, sharedAnimationValues) {
  const { latestValues } = visualElement;
  if (latestValues[key]) {
    values[key] = latestValues[key];
    visualElement.setStaticValue(key, 0);
    if (sharedAnimationValues) {
      sharedAnimationValues[key] = 0;
    }
  }
}
function cancelTreeOptimisedTransformAnimations2(projectionNode) {
  projectionNode.hasCheckedOptimisedAppear = true;
  if (projectionNode.root === projectionNode)
    return;
  const { visualElement } = projectionNode.options;
  if (!visualElement)
    return;
  const appearId = getOptimisedAppearId2(visualElement);
  if (window.MotionHasOptimisedAnimation(appearId, "transform")) {
    const { layout: layout3, layoutId } = projectionNode.options;
    window.MotionCancelOptimisedAnimation(appearId, "transform", frame2, !(layout3 || layoutId));
  }
  const { parent } = projectionNode;
  if (parent && !parent.hasCheckedOptimisedAppear) {
    cancelTreeOptimisedTransformAnimations2(parent);
  }
}
function createProjectionNode4({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
  return class ProjectionNode {
    constructor(latestValues = {}, parent = defaultParent?.()) {
      this.id = id4++;
      this.animationId = 0;
      this.children = /* @__PURE__ */ new Set();
      this.options = {};
      this.isTreeAnimating = false;
      this.isAnimationBlocked = false;
      this.isLayoutDirty = false;
      this.isProjectionDirty = false;
      this.isSharedProjectionDirty = false;
      this.isTransformDirty = false;
      this.updateManuallyBlocked = false;
      this.updateBlockedByResize = false;
      this.isUpdating = false;
      this.isSVG = false;
      this.needsReset = false;
      this.shouldResetTransform = false;
      this.hasCheckedOptimisedAppear = false;
      this.treeScale = { x: 1, y: 1 };
      this.eventHandlers = /* @__PURE__ */ new Map();
      this.hasTreeAnimated = false;
      this.updateScheduled = false;
      this.scheduleUpdate = () => this.update();
      this.projectionUpdateScheduled = false;
      this.checkUpdateFailed = () => {
        if (this.isUpdating) {
          this.isUpdating = false;
          this.clearAllSnapshots();
        }
      };
      this.updateProjection = () => {
        this.projectionUpdateScheduled = false;
        if (statsBuffer2.value) {
          metrics2.nodes = metrics2.calculatedTargetDeltas = metrics2.calculatedProjections = 0;
        }
        this.nodes.forEach(propagateDirtyNodes2);
        this.nodes.forEach(resolveTargetDelta2);
        this.nodes.forEach(calcProjection2);
        this.nodes.forEach(cleanDirtyNodes2);
        if (statsBuffer2.addProjectionMetrics) {
          statsBuffer2.addProjectionMetrics(metrics2);
        }
      };
      this.resolvedRelativeTargetAt = 0;
      this.hasProjected = false;
      this.isVisible = true;
      this.animationProgress = 0;
      this.sharedNodes = /* @__PURE__ */ new Map();
      this.latestValues = latestValues;
      this.root = parent ? parent.root || parent : this;
      this.path = parent ? [...parent.path, parent] : [];
      this.parent = parent;
      this.depth = parent ? parent.depth + 1 : 0;
      for (let i = 0; i < this.path.length; i++) {
        this.path[i].shouldResetTransform = true;
      }
      if (this.root === this)
        this.nodes = new FlatTree2();
    }
    addEventListener(name, handler) {
      if (!this.eventHandlers.has(name)) {
        this.eventHandlers.set(name, new SubscriptionManager2());
      }
      return this.eventHandlers.get(name).add(handler);
    }
    notifyListeners(name, ...args) {
      const subscriptionManager = this.eventHandlers.get(name);
      subscriptionManager && subscriptionManager.notify(...args);
    }
    hasListeners(name) {
      return this.eventHandlers.has(name);
    }
    /**
     * Lifecycles
     */
    mount(instance, isLayoutDirty = this.root.hasTreeAnimated) {
      if (this.instance)
        return;
      this.isSVG = isSVGElement2(instance);
      this.instance = instance;
      const { layoutId, layout: layout3, visualElement } = this.options;
      if (visualElement && !visualElement.current) {
        visualElement.mount(instance);
      }
      this.root.nodes.add(this);
      this.parent && this.parent.children.add(this);
      if (isLayoutDirty && (layout3 || layoutId)) {
        this.isLayoutDirty = true;
      }
      if (attachResizeListener) {
        let cancelDelay;
        const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
        attachResizeListener(instance, () => {
          this.root.updateBlockedByResize = true;
          cancelDelay && cancelDelay();
          cancelDelay = delay2(resizeUnblockUpdate, 250);
          if (globalProjectionState2.hasAnimatedSinceResize) {
            globalProjectionState2.hasAnimatedSinceResize = false;
            this.nodes.forEach(finishAnimation2);
          }
        });
      }
      if (layoutId) {
        this.root.registerSharedNode(layoutId, this);
      }
      if (this.options.animate !== false && visualElement && (layoutId || layout3)) {
        this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeLayoutChanged, layout: newLayout }) => {
          if (this.isTreeAnimationBlocked()) {
            this.target = void 0;
            this.relativeTarget = void 0;
            return;
          }
          const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition2;
          const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
          const hasTargetChanged = !this.targetLayout || !boxEqualsRounded2(this.targetLayout, newLayout);
          const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeLayoutChanged;
          if (this.options.layoutRoot || this.resumeFrom || hasOnlyRelativeTargetChanged || hasLayoutChanged && (hasTargetChanged || !this.currentAnimation)) {
            if (this.resumeFrom) {
              this.resumingFrom = this.resumeFrom;
              this.resumingFrom.resumingFrom = void 0;
            }
            this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
            const animationOptions = {
              ...getValueTransition2(layoutTransition, "layout"),
              onPlay: onLayoutAnimationStart,
              onComplete: onLayoutAnimationComplete
            };
            if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
              animationOptions.delay = 0;
              animationOptions.type = false;
            }
            this.startAnimation(animationOptions);
          } else {
            if (!hasLayoutChanged) {
              finishAnimation2(this);
            }
            if (this.isLead() && this.options.onExitComplete) {
              this.options.onExitComplete();
            }
          }
          this.targetLayout = newLayout;
        });
      }
    }
    unmount() {
      this.options.layoutId && this.willUpdate();
      this.root.nodes.remove(this);
      const stack = this.getStack();
      stack && stack.remove(this);
      this.parent && this.parent.children.delete(this);
      this.instance = void 0;
      cancelFrame2(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = true;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = false;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
    }
    // Note: currently only running on root node
    startUpdate() {
      if (this.isUpdateBlocked())
        return;
      this.isUpdating = true;
      this.nodes && this.nodes.forEach(resetSkewAndRotation2);
      this.animationId++;
    }
    getTransformTemplate() {
      const { visualElement } = this.options;
      return visualElement && visualElement.getProps().transformTemplate;
    }
    willUpdate(shouldNotifyListeners = true) {
      this.root.hasTreeAnimated = true;
      if (this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear) {
        cancelTreeOptimisedTransformAnimations2(this);
      }
      !this.root.isUpdating && this.root.startUpdate();
      if (this.isLayoutDirty)
        return;
      this.isLayoutDirty = true;
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        node.shouldResetTransform = true;
        node.updateScroll("snapshot");
        if (node.options.layoutRoot) {
          node.willUpdate(false);
        }
      }
      const { layoutId, layout: layout3 } = this.options;
      if (layoutId === void 0 && !layout3)
        return;
      const transformTemplate = this.getTransformTemplate();
      this.prevTransformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
      this.updateSnapshot();
      shouldNotifyListeners && this.notifyListeners("willUpdate");
    }
    update() {
      this.updateScheduled = false;
      const updateWasBlocked = this.isUpdateBlocked();
      if (updateWasBlocked) {
        this.unblockUpdate();
        this.clearAllSnapshots();
        this.nodes.forEach(clearMeasurements2);
        return;
      }
      if (!this.isUpdating) {
        this.nodes.forEach(clearIsLayoutDirty2);
      }
      this.isUpdating = false;
      this.nodes.forEach(resetTransformStyle2);
      this.nodes.forEach(updateLayout2);
      this.nodes.forEach(notifyLayoutUpdate2);
      this.clearAllSnapshots();
      const now3 = time2.now();
      frameData2.delta = clamp2(0, 1e3 / 60, now3 - frameData2.timestamp);
      frameData2.timestamp = now3;
      frameData2.isProcessing = true;
      frameSteps2.update.process(frameData2);
      frameSteps2.preRender.process(frameData2);
      frameSteps2.render.process(frameData2);
      frameData2.isProcessing = false;
    }
    didUpdate() {
      if (!this.updateScheduled) {
        this.updateScheduled = true;
        microtask2.read(this.scheduleUpdate);
      }
    }
    clearAllSnapshots() {
      this.nodes.forEach(clearSnapshot2);
      this.sharedNodes.forEach(removeLeadSnapshots2);
    }
    scheduleUpdateProjection() {
      if (!this.projectionUpdateScheduled) {
        this.projectionUpdateScheduled = true;
        frame2.preRender(this.updateProjection, false, true);
      }
    }
    scheduleCheckAfterUnmount() {
      frame2.postRender(() => {
        if (this.isLayoutDirty) {
          this.root.didUpdate();
        } else {
          this.root.checkUpdateFailed();
        }
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      if (this.snapshot || !this.instance)
        return;
      this.snapshot = this.measure();
      if (this.snapshot && !calcLength2(this.snapshot.measuredBox.x) && !calcLength2(this.snapshot.measuredBox.y)) {
        this.snapshot = void 0;
      }
    }
    updateLayout() {
      if (!this.instance)
        return;
      this.updateScroll();
      if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
        return;
      }
      if (this.resumeFrom && !this.resumeFrom.instance) {
        for (let i = 0; i < this.path.length; i++) {
          const node = this.path[i];
          node.updateScroll();
        }
      }
      const prevLayout = this.layout;
      this.layout = this.measure(false);
      this.layoutCorrected = createBox2();
      this.isLayoutDirty = false;
      this.projectionDelta = void 0;
      this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement } = this.options;
      visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : void 0);
    }
    updateScroll(phase = "measure") {
      let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) {
        needsMeasurement = false;
      }
      if (needsMeasurement) {
        const isRoot = checkIsScrollRoot(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase,
          isRoot,
          offset: measureScroll(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : isRoot
        };
      }
    }
    resetTransform() {
      if (!resetTransform)
        return;
      const isResetRequested = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout;
      const hasProjection = this.projectionDelta && !isDeltaZero2(this.projectionDelta);
      const transformTemplate = this.getTransformTemplate();
      const transformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
      const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
      if (isResetRequested && (hasProjection || hasTransform2(this.latestValues) || transformTemplateHasChanged)) {
        resetTransform(this.instance, transformTemplateValue);
        this.shouldResetTransform = false;
        this.scheduleRender();
      }
    }
    measure(removeTransform = true) {
      const pageBox = this.measurePageBox();
      let layoutBox = this.removeElementScroll(pageBox);
      if (removeTransform) {
        layoutBox = this.removeTransform(layoutBox);
      }
      roundBox2(layoutBox);
      return {
        animationId: this.root.animationId,
        measuredBox: pageBox,
        layoutBox,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement } = this.options;
      if (!visualElement)
        return createBox2();
      const box = visualElement.measureViewportBox();
      const wasInScrollRoot = this.scroll?.wasRoot || this.path.some(checkNodeWasScrollRoot2);
      if (!wasInScrollRoot) {
        const { scroll } = this.root;
        if (scroll) {
          translateAxis2(box.x, scroll.offset.x);
          translateAxis2(box.y, scroll.offset.y);
        }
      }
      return box;
    }
    removeElementScroll(box) {
      const boxWithoutScroll = createBox2();
      copyBoxInto2(boxWithoutScroll, box);
      if (this.scroll?.wasRoot) {
        return boxWithoutScroll;
      }
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        const { scroll, options } = node;
        if (node !== this.root && scroll && options.layoutScroll) {
          if (scroll.wasRoot) {
            copyBoxInto2(boxWithoutScroll, box);
          }
          translateAxis2(boxWithoutScroll.x, scroll.offset.x);
          translateAxis2(boxWithoutScroll.y, scroll.offset.y);
        }
      }
      return boxWithoutScroll;
    }
    applyTransform(box, transformOnly = false) {
      const withTransforms = createBox2();
      copyBoxInto2(withTransforms, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
          transformBox2(withTransforms, {
            x: -node.scroll.offset.x,
            y: -node.scroll.offset.y
          });
        }
        if (!hasTransform2(node.latestValues))
          continue;
        transformBox2(withTransforms, node.latestValues);
      }
      if (hasTransform2(this.latestValues)) {
        transformBox2(withTransforms, this.latestValues);
      }
      return withTransforms;
    }
    removeTransform(box) {
      const boxWithoutTransform = createBox2();
      copyBoxInto2(boxWithoutTransform, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!node.instance)
          continue;
        if (!hasTransform2(node.latestValues))
          continue;
        hasScale2(node.latestValues) && node.updateSnapshot();
        const sourceBox = createBox2();
        const nodeBox = node.measurePageBox();
        copyBoxInto2(sourceBox, nodeBox);
        removeBoxTransforms2(boxWithoutTransform, node.latestValues, node.snapshot ? node.snapshot.layoutBox : void 0, sourceBox);
      }
      if (hasTransform2(this.latestValues)) {
        removeBoxTransforms2(boxWithoutTransform, this.latestValues);
      }
      return boxWithoutTransform;
    }
    setTargetDelta(delta) {
      this.targetDelta = delta;
      this.root.scheduleUpdateProjection();
      this.isProjectionDirty = true;
    }
    setOptions(options) {
      this.options = {
        ...this.options,
        ...options,
        crossfade: options.crossfade !== void 0 ? options.crossfade : true
      };
    }
    clearMeasurements() {
      this.scroll = void 0;
      this.layout = void 0;
      this.snapshot = void 0;
      this.prevTransformTemplateValue = void 0;
      this.targetDelta = void 0;
      this.target = void 0;
      this.isLayoutDirty = false;
    }
    forceRelativeParentToResolveTarget() {
      if (!this.relativeParent)
        return;
      if (this.relativeParent.resolvedRelativeTargetAt !== frameData2.timestamp) {
        this.relativeParent.resolveTargetDelta(true);
      }
    }
    resolveTargetDelta(forceRecalculation = false) {
      const lead = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
      this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
      this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      const canSkip = !(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize);
      if (canSkip)
        return;
      const { layout: layout3, layoutId } = this.options;
      if (!this.layout || !(layout3 || layoutId))
        return;
      this.resolvedRelativeTargetAt = frameData2.timestamp;
      if (!this.targetDelta && !this.relativeTarget) {
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && relativeParent.layout && this.animationProgress !== 1) {
          this.relativeParent = relativeParent;
          this.forceRelativeParentToResolveTarget();
          this.relativeTarget = createBox2();
          this.relativeTargetOrigin = createBox2();
          calcRelativePosition2(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
          copyBoxInto2(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      if (!this.relativeTarget && !this.targetDelta)
        return;
      if (!this.target) {
        this.target = createBox2();
        this.targetWithTransforms = createBox2();
      }
      if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
        this.forceRelativeParentToResolveTarget();
        calcRelativeBox2(this.target, this.relativeTarget, this.relativeParent.target);
      } else if (this.targetDelta) {
        if (Boolean(this.resumingFrom)) {
          this.target = this.applyTransform(this.layout.layoutBox);
        } else {
          copyBoxInto2(this.target, this.layout.layoutBox);
        }
        applyBoxDelta2(this.target, this.targetDelta);
      } else {
        copyBoxInto2(this.target, this.layout.layoutBox);
      }
      if (this.attemptToResolveRelativeTarget) {
        this.attemptToResolveRelativeTarget = false;
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) {
          this.relativeParent = relativeParent;
          this.forceRelativeParentToResolveTarget();
          this.relativeTarget = createBox2();
          this.relativeTargetOrigin = createBox2();
          calcRelativePosition2(this.relativeTargetOrigin, this.target, relativeParent.target);
          copyBoxInto2(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      if (statsBuffer2.value) {
        metrics2.calculatedTargetDeltas++;
      }
    }
    getClosestProjectingParent() {
      if (!this.parent || hasScale2(this.parent.latestValues) || has2DTranslate2(this.parent.latestValues)) {
        return void 0;
      }
      if (this.parent.isProjecting()) {
        return this.parent;
      } else {
        return this.parent.getClosestProjectingParent();
      }
    }
    isProjecting() {
      return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      const lead = this.getLead();
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      let canSkip = true;
      if (this.isProjectionDirty || this.parent?.isProjectionDirty) {
        canSkip = false;
      }
      if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) {
        canSkip = false;
      }
      if (this.resolvedRelativeTargetAt === frameData2.timestamp) {
        canSkip = false;
      }
      if (canSkip)
        return;
      const { layout: layout3, layoutId } = this.options;
      this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
      if (!this.isTreeAnimating) {
        this.targetDelta = this.relativeTarget = void 0;
      }
      if (!this.layout || !(layout3 || layoutId))
        return;
      copyBoxInto2(this.layoutCorrected, this.layout.layoutBox);
      const prevTreeScaleX = this.treeScale.x;
      const prevTreeScaleY = this.treeScale.y;
      applyTreeDeltas2(this.layoutCorrected, this.treeScale, this.path, isShared);
      if (lead.layout && !lead.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
        lead.target = lead.layout.layoutBox;
        lead.targetWithTransforms = createBox2();
      }
      const { target } = lead;
      if (!target) {
        if (this.prevProjectionDelta) {
          this.createProjectionDeltas();
          this.scheduleRender();
        }
        return;
      }
      if (!this.projectionDelta || !this.prevProjectionDelta) {
        this.createProjectionDeltas();
      } else {
        copyAxisDeltaInto2(this.prevProjectionDelta.x, this.projectionDelta.x);
        copyAxisDeltaInto2(this.prevProjectionDelta.y, this.projectionDelta.y);
      }
      calcBoxDelta2(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
      if (this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY || !axisDeltaEquals2(this.projectionDelta.x, this.prevProjectionDelta.x) || !axisDeltaEquals2(this.projectionDelta.y, this.prevProjectionDelta.y)) {
        this.hasProjected = true;
        this.scheduleRender();
        this.notifyListeners("projectionUpdate", target);
      }
      if (statsBuffer2.value) {
        metrics2.calculatedProjections++;
      }
    }
    hide() {
      this.isVisible = false;
    }
    show() {
      this.isVisible = true;
    }
    scheduleRender(notifyAll = true) {
      this.options.visualElement?.scheduleRender();
      if (notifyAll) {
        const stack = this.getStack();
        stack && stack.scheduleRender();
      }
      if (this.resumingFrom && !this.resumingFrom.instance) {
        this.resumingFrom = void 0;
      }
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = createDelta2();
      this.projectionDelta = createDelta2();
      this.projectionDeltaWithTransform = createDelta2();
    }
    setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
      const snapshot = this.snapshot;
      const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
      const mixedValues = { ...this.latestValues };
      const targetDelta = createDelta2();
      if (!this.relativeParent || !this.relativeParent.options.layoutRoot) {
        this.relativeTarget = this.relativeTargetOrigin = void 0;
      }
      this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
      const relativeLayout = createBox2();
      const snapshotSource = snapshot ? snapshot.source : void 0;
      const layoutSource = this.layout ? this.layout.source : void 0;
      const isSharedLayoutAnimation = snapshotSource !== layoutSource;
      const stack = this.getStack();
      const isOnlyMember = !stack || stack.members.length <= 1;
      const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade2));
      this.animationProgress = 0;
      let prevRelativeTarget;
      this.mixTargetDelta = (latest) => {
        const progress3 = latest / 1e3;
        mixAxisDelta2(targetDelta.x, delta.x, progress3);
        mixAxisDelta2(targetDelta.y, delta.y, progress3);
        this.setTargetDelta(targetDelta);
        if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
          calcRelativePosition2(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
          mixBox2(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress3);
          if (prevRelativeTarget && boxEquals2(this.relativeTarget, prevRelativeTarget)) {
            this.isProjectionDirty = false;
          }
          if (!prevRelativeTarget)
            prevRelativeTarget = createBox2();
          copyBoxInto2(prevRelativeTarget, this.relativeTarget);
        }
        if (isSharedLayoutAnimation) {
          this.animationValues = mixedValues;
          mixValues2(mixedValues, snapshotLatestValues, this.latestValues, progress3, shouldCrossfadeOpacity, isOnlyMember);
        }
        this.root.scheduleUpdateProjection();
        this.scheduleRender();
        this.animationProgress = progress3;
      };
      this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(options) {
      this.notifyListeners("animationStart");
      this.currentAnimation && this.currentAnimation.stop();
      if (this.resumingFrom && this.resumingFrom.currentAnimation) {
        this.resumingFrom.currentAnimation.stop();
      }
      if (this.pendingAnimation) {
        cancelFrame2(this.pendingAnimation);
        this.pendingAnimation = void 0;
      }
      this.pendingAnimation = frame2.update(() => {
        globalProjectionState2.hasAnimatedSinceResize = true;
        activeAnimations2.layout++;
        this.currentAnimation = animateSingleValue2(0, animationTarget2, {
          ...options,
          onUpdate: (latest) => {
            this.mixTargetDelta(latest);
            options.onUpdate && options.onUpdate(latest);
          },
          onStop: () => {
            activeAnimations2.layout--;
          },
          onComplete: () => {
            activeAnimations2.layout--;
            options.onComplete && options.onComplete();
            this.completeAnimation();
          }
        });
        if (this.resumingFrom) {
          this.resumingFrom.currentAnimation = this.currentAnimation;
        }
        this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      if (this.resumingFrom) {
        this.resumingFrom.currentAnimation = void 0;
        this.resumingFrom.preserveOpacity = void 0;
      }
      const stack = this.getStack();
      stack && stack.exitAnimationComplete();
      this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
      this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      if (this.currentAnimation) {
        this.mixTargetDelta && this.mixTargetDelta(animationTarget2);
        this.currentAnimation.stop();
      }
      this.completeAnimation();
    }
    applyTransformsToTarget() {
      const lead = this.getLead();
      let { targetWithTransforms, target, layout: layout3, latestValues } = lead;
      if (!targetWithTransforms || !target || !layout3)
        return;
      if (this !== lead && this.layout && layout3 && shouldAnimatePositionOnly2(this.options.animationType, this.layout.layoutBox, layout3.layoutBox)) {
        target = this.target || createBox2();
        const xLength = calcLength2(this.layout.layoutBox.x);
        target.x.min = lead.target.x.min;
        target.x.max = target.x.min + xLength;
        const yLength = calcLength2(this.layout.layoutBox.y);
        target.y.min = lead.target.y.min;
        target.y.max = target.y.min + yLength;
      }
      copyBoxInto2(targetWithTransforms, target);
      transformBox2(targetWithTransforms, latestValues);
      calcBoxDelta2(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
    }
    registerSharedNode(layoutId, node) {
      if (!this.sharedNodes.has(layoutId)) {
        this.sharedNodes.set(layoutId, new NodeStack2());
      }
      const stack = this.sharedNodes.get(layoutId);
      stack.add(node);
      const config = node.options.initialPromotionConfig;
      node.promote({
        transition: config ? config.transition : void 0,
        preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node) : void 0
      });
    }
    isLead() {
      const stack = this.getStack();
      return stack ? stack.lead === this : true;
    }
    getLead() {
      const { layoutId } = this.options;
      return layoutId ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId } = this.options;
      return layoutId ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId } = this.options;
      if (layoutId)
        return this.root.sharedNodes.get(layoutId);
    }
    promote({ needsReset, transition, preserveFollowOpacity } = {}) {
      const stack = this.getStack();
      if (stack)
        stack.promote(this, preserveFollowOpacity);
      if (needsReset) {
        this.projectionDelta = void 0;
        this.needsReset = true;
      }
      if (transition)
        this.setOptions({ transition });
    }
    relegate() {
      const stack = this.getStack();
      if (stack) {
        return stack.relegate(this);
      } else {
        return false;
      }
    }
    resetSkewAndRotation() {
      const { visualElement } = this.options;
      if (!visualElement)
        return;
      let hasDistortingTransform = false;
      const { latestValues } = visualElement;
      if (latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ || latestValues.skewX || latestValues.skewY) {
        hasDistortingTransform = true;
      }
      if (!hasDistortingTransform)
        return;
      const resetValues = {};
      if (latestValues.z) {
        resetDistortingTransform2("z", visualElement, resetValues, this.animationValues);
      }
      for (let i = 0; i < transformAxes2.length; i++) {
        resetDistortingTransform2(`rotate${transformAxes2[i]}`, visualElement, resetValues, this.animationValues);
        resetDistortingTransform2(`skew${transformAxes2[i]}`, visualElement, resetValues, this.animationValues);
      }
      visualElement.render();
      for (const key in resetValues) {
        visualElement.setStaticValue(key, resetValues[key]);
        if (this.animationValues) {
          this.animationValues[key] = resetValues[key];
        }
      }
      visualElement.scheduleRender();
    }
    getProjectionStyles(styleProp) {
      if (!this.instance || this.isSVG)
        return void 0;
      if (!this.isVisible) {
        return hiddenVisibility2;
      }
      const styles = {
        visibility: ""
      };
      const transformTemplate = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = false;
        styles.opacity = "";
        styles.pointerEvents = resolveMotionValue2(styleProp?.pointerEvents) || "";
        styles.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
        return styles;
      }
      const lead = this.getLead();
      if (!this.projectionDelta || !this.layout || !lead.target) {
        const emptyStyles = {};
        if (this.options.layoutId) {
          emptyStyles.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
          emptyStyles.pointerEvents = resolveMotionValue2(styleProp?.pointerEvents) || "";
        }
        if (this.hasProjected && !hasTransform2(this.latestValues)) {
          emptyStyles.transform = transformTemplate ? transformTemplate({}, "") : "none";
          this.hasProjected = false;
        }
        return emptyStyles;
      }
      const valuesToRender = lead.animationValues || lead.latestValues;
      this.applyTransformsToTarget();
      styles.transform = buildProjectionTransform2(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
      if (transformTemplate) {
        styles.transform = transformTemplate(valuesToRender, styles.transform);
      }
      const { x, y } = this.projectionDelta;
      styles.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
      if (lead.animationValues) {
        styles.opacity = lead === this ? valuesToRender.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
      } else {
        styles.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
      }
      for (const key in scaleCorrectors2) {
        if (valuesToRender[key] === void 0)
          continue;
        const { correct, applyTo, isCSSVariable } = scaleCorrectors2[key];
        const corrected = styles.transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
        if (applyTo) {
          const num = applyTo.length;
          for (let i = 0; i < num; i++) {
            styles[applyTo[i]] = corrected;
          }
        } else {
          if (isCSSVariable) {
            this.options.visualElement.renderState.vars[key] = corrected;
          } else {
            styles[key] = corrected;
          }
        }
      }
      if (this.options.layoutId) {
        styles.pointerEvents = lead === this ? resolveMotionValue2(styleProp?.pointerEvents) || "" : "none";
      }
      return styles;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((node) => node.currentAnimation?.stop());
      this.root.nodes.forEach(clearMeasurements2);
      this.root.sharedNodes.clear();
    }
  };
}
function updateLayout2(node) {
  node.updateLayout();
}
function notifyLayoutUpdate2(node) {
  const snapshot = node.resumeFrom?.snapshot || node.snapshot;
  if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
    const { layoutBox: layout3, measuredBox: measuredLayout } = node.layout;
    const { animationType } = node.options;
    const isShared = snapshot.source !== node.layout.source;
    if (animationType === "size") {
      eachAxis2((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength2(axisSnapshot);
        axisSnapshot.min = layout3[axis].min;
        axisSnapshot.max = axisSnapshot.min + length;
      });
    } else if (shouldAnimatePositionOnly2(animationType, snapshot.layoutBox, layout3)) {
      eachAxis2((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength2(layout3[axis]);
        axisSnapshot.max = axisSnapshot.min + length;
        if (node.relativeTarget && !node.currentAnimation) {
          node.isProjectionDirty = true;
          node.relativeTarget[axis].max = node.relativeTarget[axis].min + length;
        }
      });
    }
    const layoutDelta = createDelta2();
    calcBoxDelta2(layoutDelta, layout3, snapshot.layoutBox);
    const visualDelta = createDelta2();
    if (isShared) {
      calcBoxDelta2(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
    } else {
      calcBoxDelta2(visualDelta, layout3, snapshot.layoutBox);
    }
    const hasLayoutChanged = !isDeltaZero2(layoutDelta);
    let hasRelativeLayoutChanged = false;
    if (!node.resumeFrom) {
      const relativeParent = node.getClosestProjectingParent();
      if (relativeParent && !relativeParent.resumeFrom) {
        const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
        if (parentSnapshot && parentLayout) {
          const relativeSnapshot = createBox2();
          calcRelativePosition2(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
          const relativeLayout = createBox2();
          calcRelativePosition2(relativeLayout, layout3, parentLayout.layoutBox);
          if (!boxEqualsRounded2(relativeSnapshot, relativeLayout)) {
            hasRelativeLayoutChanged = true;
          }
          if (relativeParent.options.layoutRoot) {
            node.relativeTarget = relativeLayout;
            node.relativeTargetOrigin = relativeSnapshot;
            node.relativeParent = relativeParent;
          }
        }
      }
    }
    node.notifyListeners("didUpdate", {
      layout: layout3,
      snapshot,
      delta: visualDelta,
      layoutDelta,
      hasLayoutChanged,
      hasRelativeLayoutChanged
    });
  } else if (node.isLead()) {
    const { onExitComplete } = node.options;
    onExitComplete && onExitComplete();
  }
  node.options.transition = void 0;
}
function propagateDirtyNodes2(node) {
  if (statsBuffer2.value) {
    metrics2.nodes++;
  }
  if (!node.parent)
    return;
  if (!node.isProjecting()) {
    node.isProjectionDirty = node.parent.isProjectionDirty;
  }
  node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty || node.parent.isProjectionDirty || node.parent.isSharedProjectionDirty));
  node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
}
function cleanDirtyNodes2(node) {
  node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = false;
}
function clearSnapshot2(node) {
  node.clearSnapshot();
}
function clearMeasurements2(node) {
  node.clearMeasurements();
}
function clearIsLayoutDirty2(node) {
  node.isLayoutDirty = false;
}
function resetTransformStyle2(node) {
  const { visualElement } = node.options;
  if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
    visualElement.notify("BeforeLayoutMeasure");
  }
  node.resetTransform();
}
function finishAnimation2(node) {
  node.finishAnimation();
  node.targetDelta = node.relativeTarget = node.target = void 0;
  node.isProjectionDirty = true;
}
function resolveTargetDelta2(node) {
  node.resolveTargetDelta();
}
function calcProjection2(node) {
  node.calcProjection();
}
function resetSkewAndRotation2(node) {
  node.resetSkewAndRotation();
}
function removeLeadSnapshots2(stack) {
  stack.removeLeadSnapshot();
}
function mixAxisDelta2(output, delta, p) {
  output.translate = mixNumber3(delta.translate, 0, p);
  output.scale = mixNumber3(delta.scale, 1, p);
  output.origin = delta.origin;
  output.originPoint = delta.originPoint;
}
function mixAxis2(output, from, to, p) {
  output.min = mixNumber3(from.min, to.min, p);
  output.max = mixNumber3(from.max, to.max, p);
}
function mixBox2(output, from, to, p) {
  mixAxis2(output.x, from.x, to.x, p);
  mixAxis2(output.y, from.y, to.y, p);
}
function hasOpacityCrossfade2(node) {
  return node.animationValues && node.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition2 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};
var userAgentContains2 = (string) => typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(string);
var roundPoint2 = userAgentContains2("applewebkit/") && !userAgentContains2("chrome/") ? Math.round : noop2;
function roundAxis2(axis) {
  axis.min = roundPoint2(axis.min);
  axis.max = roundPoint2(axis.max);
}
function roundBox2(box) {
  roundAxis2(box.x);
  roundAxis2(box.y);
}
function shouldAnimatePositionOnly2(animationType, snapshot, layout3) {
  return animationType === "position" || animationType === "preserve-aspect" && !isNear2(aspectRatio2(snapshot), aspectRatio2(layout3), 0.2);
}
function checkNodeWasScrollRoot2(node) {
  return node !== node.root && node.scroll?.wasRoot;
}

// node_modules/motion/dist/es/framer-motion/dist/es/projection/node/DocumentProjectionNode.mjs
var DocumentProjectionNode2 = createProjectionNode4({
  attachResizeListener: (ref, notify) => addDomEvent2(ref, "resize", notify),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => true
});

// node_modules/motion/dist/es/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs
var rootProjectionNode2 = {
  current: void 0
};
var HTMLProjectionNode2 = createProjectionNode4({
  measureScroll: (instance) => ({
    x: instance.scrollLeft,
    y: instance.scrollTop
  }),
  defaultParent: () => {
    if (!rootProjectionNode2.current) {
      const documentNode = new DocumentProjectionNode2({});
      documentNode.mount(window);
      documentNode.setOptions({ layoutScroll: true });
      rootProjectionNode2.current = documentNode;
    }
    return rootProjectionNode2.current;
  },
  resetTransform: (instance, value) => {
    instance.style.transform = value !== void 0 ? value : "none";
  },
  checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});

// node_modules/motion/dist/es/framer-motion/dist/es/motion/features/drag.mjs
var drag2 = {
  pan: {
    Feature: PanGesture2
  },
  drag: {
    Feature: DragGesture2,
    ProjectionNode: HTMLProjectionNode2,
    MeasureLayout: MeasureLayout2
  }
};

// node_modules/motion/dist/es/motion-dom/dist/es/utils/resolve-elements.mjs
function resolveElements2(elementOrSelector, scope, selectorCache) {
  if (elementOrSelector instanceof EventTarget) {
    return [elementOrSelector];
  } else if (typeof elementOrSelector === "string") {
    let root = document;
    if (scope) {
      root = scope.current;
    }
    const elements = selectorCache?.[elementOrSelector] ?? root.querySelectorAll(elementOrSelector);
    return elements ? Array.from(elements) : [];
  }
  return Array.from(elementOrSelector);
}

// node_modules/motion/dist/es/motion-dom/dist/es/gestures/utils/setup.mjs
function setupGesture2(elementOrSelector, options) {
  const elements = resolveElements2(elementOrSelector);
  const gestureAbortController = new AbortController();
  const eventOptions = {
    passive: true,
    ...options,
    signal: gestureAbortController.signal
  };
  const cancel = () => gestureAbortController.abort();
  return [elements, eventOptions, cancel];
}

// node_modules/motion/dist/es/motion-dom/dist/es/gestures/hover.mjs
function isValidHover2(event) {
  return !(event.pointerType === "touch" || isDragActive2());
}
function hover2(elementOrSelector, onHoverStart, options = {}) {
  const [elements, eventOptions, cancel] = setupGesture2(elementOrSelector, options);
  const onPointerEnter = (enterEvent) => {
    if (!isValidHover2(enterEvent))
      return;
    const { target } = enterEvent;
    const onHoverEnd = onHoverStart(target, enterEvent);
    if (typeof onHoverEnd !== "function" || !target)
      return;
    const onPointerLeave = (leaveEvent) => {
      if (!isValidHover2(leaveEvent))
        return;
      onHoverEnd(leaveEvent);
      target.removeEventListener("pointerleave", onPointerLeave);
    };
    target.addEventListener("pointerleave", onPointerLeave, eventOptions);
  };
  elements.forEach((element) => {
    element.addEventListener("pointerenter", onPointerEnter, eventOptions);
  });
  return cancel;
}

// node_modules/motion/dist/es/framer-motion/dist/es/gestures/hover.mjs
function handleHoverEvent2(node, event, lifecycle) {
  const { props } = node;
  if (node.animationState && props.whileHover) {
    node.animationState.setActive("whileHover", lifecycle === "Start");
  }
  const eventName = "onHover" + lifecycle;
  const callback = props[eventName];
  if (callback) {
    frame2.postRender(() => callback(event, extractEventInfo2(event)));
  }
}
var HoverGesture2 = class extends Feature2 {
  mount() {
    const { current } = this.node;
    if (!current)
      return;
    this.unmount = hover2(current, (_element, startEvent) => {
      handleHoverEvent2(this.node, startEvent, "Start");
      return (endEvent) => handleHoverEvent2(this.node, endEvent, "End");
    });
  }
  unmount() {
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/gestures/focus.mjs
var FocusGesture2 = class extends Feature2 {
  constructor() {
    super(...arguments);
    this.isActive = false;
  }
  onFocus() {
    let isFocusVisible = false;
    try {
      isFocusVisible = this.node.current.matches(":focus-visible");
    } catch (e) {
      isFocusVisible = true;
    }
    if (!isFocusVisible || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", true);
    this.isActive = true;
  }
  onBlur() {
    if (!this.isActive || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", false);
    this.isActive = false;
  }
  mount() {
    this.unmount = pipe2(addDomEvent2(this.node.current, "focus", () => this.onFocus()), addDomEvent2(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
};

// node_modules/motion/dist/es/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs
var isNodeOrChild2 = (parent, child) => {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild2(parent, child.parentElement);
  }
};

// node_modules/motion/dist/es/motion-dom/dist/es/gestures/press/utils/is-keyboard-accessible.mjs
var focusableElements2 = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function isElementKeyboardAccessible2(element) {
  return focusableElements2.has(element.tagName) || element.tabIndex !== -1;
}

// node_modules/motion/dist/es/motion-dom/dist/es/gestures/press/utils/state.mjs
var isPressing2 = /* @__PURE__ */ new WeakSet();

// node_modules/motion/dist/es/motion-dom/dist/es/gestures/press/utils/keyboard.mjs
function filterEvents2(callback) {
  return (event) => {
    if (event.key !== "Enter")
      return;
    callback(event);
  };
}
function firePointerEvent2(target, type) {
  target.dispatchEvent(new PointerEvent("pointer" + type, { isPrimary: true, bubbles: true }));
}
var enableKeyboardPress2 = (focusEvent, eventOptions) => {
  const element = focusEvent.currentTarget;
  if (!element)
    return;
  const handleKeydown = filterEvents2(() => {
    if (isPressing2.has(element))
      return;
    firePointerEvent2(element, "down");
    const handleKeyup = filterEvents2(() => {
      firePointerEvent2(element, "up");
    });
    const handleBlur = () => firePointerEvent2(element, "cancel");
    element.addEventListener("keyup", handleKeyup, eventOptions);
    element.addEventListener("blur", handleBlur, eventOptions);
  });
  element.addEventListener("keydown", handleKeydown, eventOptions);
  element.addEventListener("blur", () => element.removeEventListener("keydown", handleKeydown), eventOptions);
};

// node_modules/motion/dist/es/motion-dom/dist/es/gestures/press/index.mjs
function isValidPressEvent2(event) {
  return isPrimaryPointer2(event) && !isDragActive2();
}
function press2(targetOrSelector, onPressStart, options = {}) {
  const [targets, eventOptions, cancelEvents] = setupGesture2(targetOrSelector, options);
  const startPress = (startEvent) => {
    const target = startEvent.currentTarget;
    if (!isValidPressEvent2(startEvent) || isPressing2.has(target))
      return;
    isPressing2.add(target);
    const onPressEnd = onPressStart(target, startEvent);
    const onPointerEnd = (endEvent, success) => {
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
      if (!isValidPressEvent2(endEvent) || !isPressing2.has(target)) {
        return;
      }
      isPressing2.delete(target);
      if (typeof onPressEnd === "function") {
        onPressEnd(endEvent, { success });
      }
    };
    const onPointerUp = (upEvent) => {
      onPointerEnd(upEvent, target === window || target === document || options.useGlobalTarget || isNodeOrChild2(target, upEvent.target));
    };
    const onPointerCancel = (cancelEvent) => {
      onPointerEnd(cancelEvent, false);
    };
    window.addEventListener("pointerup", onPointerUp, eventOptions);
    window.addEventListener("pointercancel", onPointerCancel, eventOptions);
  };
  targets.forEach((target) => {
    const pointerDownTarget = options.useGlobalTarget ? window : target;
    pointerDownTarget.addEventListener("pointerdown", startPress, eventOptions);
    if (target instanceof HTMLElement) {
      target.addEventListener("focus", (event) => enableKeyboardPress2(event, eventOptions));
      if (!isElementKeyboardAccessible2(target) && !target.hasAttribute("tabindex")) {
        target.tabIndex = 0;
      }
    }
  });
  return cancelEvents;
}

// node_modules/motion/dist/es/framer-motion/dist/es/gestures/press.mjs
function handlePressEvent2(node, event, lifecycle) {
  const { props } = node;
  if (node.current instanceof HTMLButtonElement && node.current.disabled) {
    return;
  }
  if (node.animationState && props.whileTap) {
    node.animationState.setActive("whileTap", lifecycle === "Start");
  }
  const eventName = "onTap" + (lifecycle === "End" ? "" : lifecycle);
  const callback = props[eventName];
  if (callback) {
    frame2.postRender(() => callback(event, extractEventInfo2(event)));
  }
}
var PressGesture2 = class extends Feature2 {
  mount() {
    const { current } = this.node;
    if (!current)
      return;
    this.unmount = press2(current, (_element, startEvent) => {
      handlePressEvent2(this.node, startEvent, "Start");
      return (endEvent, { success }) => handlePressEvent2(this.node, endEvent, success ? "End" : "Cancel");
    }, { useGlobalTarget: this.node.props.globalTapTarget });
  }
  unmount() {
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/motion/features/viewport/observers.mjs
var observerCallbacks2 = /* @__PURE__ */ new WeakMap();
var observers2 = /* @__PURE__ */ new WeakMap();
var fireObserverCallback2 = (entry) => {
  const callback = observerCallbacks2.get(entry.target);
  callback && callback(entry);
};
var fireAllObserverCallbacks2 = (entries) => {
  entries.forEach(fireObserverCallback2);
};
function initIntersectionObserver2({ root, ...options }) {
  const lookupRoot = root || document;
  if (!observers2.has(lookupRoot)) {
    observers2.set(lookupRoot, {});
  }
  const rootObservers = observers2.get(lookupRoot);
  const key = JSON.stringify(options);
  if (!rootObservers[key]) {
    rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks2, { root, ...options });
  }
  return rootObservers[key];
}
function observeIntersection2(element, options, callback) {
  const rootInteresectionObserver = initIntersectionObserver2(options);
  observerCallbacks2.set(element, callback);
  rootInteresectionObserver.observe(element);
  return () => {
    observerCallbacks2.delete(element);
    rootInteresectionObserver.unobserve(element);
  };
}

// node_modules/motion/dist/es/framer-motion/dist/es/motion/features/viewport/index.mjs
var thresholdNames2 = {
  some: 0,
  all: 1
};
var InViewFeature2 = class extends Feature2 {
  constructor() {
    super(...arguments);
    this.hasEnteredView = false;
    this.isInView = false;
  }
  startObserver() {
    this.unmount();
    const { viewport = {} } = this.node.getProps();
    const { root, margin: rootMargin, amount = "some", once } = viewport;
    const options = {
      root: root ? root.current : void 0,
      rootMargin,
      threshold: typeof amount === "number" ? amount : thresholdNames2[amount]
    };
    const onIntersectionUpdate = (entry) => {
      const { isIntersecting } = entry;
      if (this.isInView === isIntersecting)
        return;
      this.isInView = isIntersecting;
      if (once && !isIntersecting && this.hasEnteredView) {
        return;
      } else if (isIntersecting) {
        this.hasEnteredView = true;
      }
      if (this.node.animationState) {
        this.node.animationState.setActive("whileInView", isIntersecting);
      }
      const { onViewportEnter, onViewportLeave } = this.node.getProps();
      const callback = isIntersecting ? onViewportEnter : onViewportLeave;
      callback && callback(entry);
    };
    return observeIntersection2(this.node.current, options, onIntersectionUpdate);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver === "undefined")
      return;
    const { props, prevProps } = this.node;
    const hasOptionsChanged = ["amount", "margin", "root"].some(hasViewportOptionChanged2(props, prevProps));
    if (hasOptionsChanged) {
      this.startObserver();
    }
  }
  unmount() {
  }
};
function hasViewportOptionChanged2({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
  return (name) => viewport[name] !== prevViewport[name];
}

// node_modules/motion/dist/es/framer-motion/dist/es/motion/features/gestures.mjs
var gestureAnimations2 = {
  inView: {
    Feature: InViewFeature2
  },
  tap: {
    Feature: PressGesture2
  },
  focus: {
    Feature: FocusGesture2
  },
  hover: {
    Feature: HoverGesture2
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/motion/features/layout.mjs
var layout2 = {
  layout: {
    ProjectionNode: HTMLProjectionNode2,
    MeasureLayout: MeasureLayout2
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/render/dom/create-visual-element.mjs
var import_react39 = __toESM(require_react(), 1);

// node_modules/motion/dist/es/framer-motion/dist/es/utils/reduced-motion/state.mjs
var prefersReducedMotion2 = { current: null };
var hasReducedMotionListener2 = { current: false };

// node_modules/motion/dist/es/framer-motion/dist/es/utils/reduced-motion/index.mjs
function initPrefersReducedMotion2() {
  hasReducedMotionListener2.current = true;
  if (!isBrowser2)
    return;
  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = () => prefersReducedMotion2.current = motionMediaQuery.matches;
    motionMediaQuery.addListener(setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion2.current = false;
  }
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/store.mjs
var visualElementStore2 = /* @__PURE__ */ new WeakMap();

// node_modules/motion/dist/es/framer-motion/dist/es/render/utils/motion-values.mjs
function updateMotionValuesFromProps2(element, next, prev) {
  for (const key in next) {
    const nextValue = next[key];
    const prevValue = prev[key];
    if (isMotionValue2(nextValue)) {
      element.addValue(key, nextValue);
      if (true) {
        warnOnce2(nextValue.version === "12.9.2", `Attempting to mix Motion versions ${nextValue.version} with 12.9.2 may not work as expected.`);
      }
    } else if (isMotionValue2(prevValue)) {
      element.addValue(key, motionValue2(nextValue, { owner: element }));
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        const existingValue = element.getValue(key);
        if (existingValue.liveStyle === true) {
          existingValue.jump(nextValue);
        } else if (!existingValue.hasAnimated) {
          existingValue.set(nextValue);
        }
      } else {
        const latestValue = element.getStaticValue(key);
        element.addValue(key, motionValue2(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
      }
    }
  }
  for (const key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}

// node_modules/motion/dist/es/motion-utils/dist/es/is-numerical-string.mjs
var isNumericalString2 = (v) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);

// node_modules/motion/dist/es/motion-utils/dist/es/is-zero-value-string.mjs
var isZeroValueString2 = (v) => /^0[^.\s]+$/u.test(v);

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/auto.mjs
var auto2 = {
  test: (v) => v === "auto",
  parse: (v) => v
};

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/test.mjs
var testValueType2 = (v) => (type) => type.test(v);

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/dimensions.mjs
var dimensionValueTypes2 = [number2, px2, percent2, degrees2, vw2, vh2, auto2];
var findDimensionValueType2 = (v) => dimensionValueTypes2.find(testValueType2(v));

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/utils/find.mjs
var valueTypes2 = [...dimensionValueTypes2, color2, complex2];
var findValueType2 = (v) => valueTypes2.find(testValueType2(v));

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/complex/filter.mjs
var maxDefaults2 = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter2(v) {
  const [name, value] = v.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v;
  const [number3] = value.match(floatRegex2) || [];
  if (!number3)
    return v;
  const unit = value.replace(number3, "");
  let defaultValue = maxDefaults2.has(name) ? 1 : 0;
  if (number3 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
var functionRegex2 = /\b([a-z-]*)\(.*?\)/gu;
var filter2 = {
  ...complex2,
  getAnimatableNone: (v) => {
    const functions = v.match(functionRegex2);
    return functions ? functions.map(applyDefaultFilter2).join(" ") : v;
  }
};

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/maps/defaults.mjs
var defaultValueTypes2 = {
  ...numberValueTypes2,
  // Color props
  color: color2,
  backgroundColor: color2,
  outlineColor: color2,
  fill: color2,
  stroke: color2,
  // Border props
  borderColor: color2,
  borderTopColor: color2,
  borderRightColor: color2,
  borderBottomColor: color2,
  borderLeftColor: color2,
  filter: filter2,
  WebkitFilter: filter2
};
var getDefaultValueType2 = (key) => defaultValueTypes2[key];

// node_modules/motion/dist/es/motion-dom/dist/es/value/types/utils/animatable-none.mjs
function getAnimatableNone4(key, value) {
  let defaultValueType = getDefaultValueType2(key);
  if (defaultValueType !== filter2)
    defaultValueType = complex2;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/VisualElement.mjs
var propEventHandlers2 = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
var VisualElement2 = class {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
    return {};
  }
  constructor({ parent, props, presenceContext, reducedMotionConfig, blockInitialAnimation, visualState }, options = {}) {
    this.current = null;
    this.children = /* @__PURE__ */ new Set();
    this.isVariantNode = false;
    this.isControllingVariants = false;
    this.shouldReduceMotion = null;
    this.values = /* @__PURE__ */ new Map();
    this.KeyframeResolver = KeyframeResolver2;
    this.features = {};
    this.valueSubscriptions = /* @__PURE__ */ new Map();
    this.prevMotionValues = {};
    this.events = {};
    this.propEventSubscriptions = {};
    this.notifyUpdate = () => this.notify("Update", this.latestValues);
    this.render = () => {
      if (!this.current)
        return;
      this.triggerBuild();
      this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
    };
    this.renderScheduledAt = 0;
    this.scheduleRender = () => {
      const now3 = time2.now();
      if (this.renderScheduledAt < now3) {
        this.renderScheduledAt = now3;
        frame2.render(this.render, false, true);
      }
    };
    const { latestValues, renderState } = visualState;
    this.latestValues = latestValues;
    this.baseTarget = { ...latestValues };
    this.initialValues = props.initial ? { ...latestValues } : {};
    this.renderState = renderState;
    this.parent = parent;
    this.props = props;
    this.presenceContext = presenceContext;
    this.depth = parent ? parent.depth + 1 : 0;
    this.reducedMotionConfig = reducedMotionConfig;
    this.options = options;
    this.blockInitialAnimation = Boolean(blockInitialAnimation);
    this.isControllingVariants = isControllingVariants2(props);
    this.isVariantNode = isVariantNode2(props);
    if (this.isVariantNode) {
      this.variantChildren = /* @__PURE__ */ new Set();
    }
    this.manuallyAnimateOnMount = Boolean(parent && parent.current);
    const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
    for (const key in initialMotionValues) {
      const value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue2(value)) {
        value.set(latestValues[key], false);
      }
    }
  }
  mount(instance) {
    this.current = instance;
    visualElementStore2.set(instance, this);
    if (this.projection && !this.projection.instance) {
      this.projection.mount(instance);
    }
    if (this.parent && this.isVariantNode && !this.isControllingVariants) {
      this.removeFromVariantTree = this.parent.addVariantChild(this);
    }
    this.values.forEach((value, key) => this.bindToMotionValue(key, value));
    if (!hasReducedMotionListener2.current) {
      initPrefersReducedMotion2();
    }
    this.shouldReduceMotion = this.reducedMotionConfig === "never" ? false : this.reducedMotionConfig === "always" ? true : prefersReducedMotion2.current;
    if (true) {
      warnOnce2(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.");
    }
    if (this.parent)
      this.parent.children.add(this);
    this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount();
    cancelFrame2(this.notifyUpdate);
    cancelFrame2(this.render);
    this.valueSubscriptions.forEach((remove) => remove());
    this.valueSubscriptions.clear();
    this.removeFromVariantTree && this.removeFromVariantTree();
    this.parent && this.parent.children.delete(this);
    for (const key in this.events) {
      this.events[key].clear();
    }
    for (const key in this.features) {
      const feature = this.features[key];
      if (feature) {
        feature.unmount();
        feature.isMounted = false;
      }
    }
    this.current = null;
  }
  bindToMotionValue(key, value) {
    if (this.valueSubscriptions.has(key)) {
      this.valueSubscriptions.get(key)();
    }
    const valueIsTransform = transformProps2.has(key);
    if (valueIsTransform && this.onBindTransform) {
      this.onBindTransform();
    }
    const removeOnChange = value.on("change", (latestValue) => {
      this.latestValues[key] = latestValue;
      this.props.onUpdate && frame2.preRender(this.notifyUpdate);
      if (valueIsTransform && this.projection) {
        this.projection.isTransformDirty = true;
      }
    });
    const removeOnRenderRequest = value.on("renderRequest", this.scheduleRender);
    let removeSyncCheck;
    if (window.MotionCheckAppearSync) {
      removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
    }
    this.valueSubscriptions.set(key, () => {
      removeOnChange();
      removeOnRenderRequest();
      if (removeSyncCheck)
        removeSyncCheck();
      if (value.owner)
        value.stop();
    });
  }
  sortNodePosition(other) {
    if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
      return 0;
    }
    return this.sortInstanceNodePosition(this.current, other.current);
  }
  updateFeatures() {
    let key = "animation";
    for (key in featureDefinitions2) {
      const featureDefinition = featureDefinitions2[key];
      if (!featureDefinition)
        continue;
      const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
      if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) {
        this.features[key] = new FeatureConstructor(this);
      }
      if (this.features[key]) {
        const feature = this.features[key];
        if (feature.isMounted) {
          feature.update();
        } else {
          feature.mount();
          feature.isMounted = true;
        }
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox2();
  }
  getStaticValue(key) {
    return this.latestValues[key];
  }
  setStaticValue(key, value) {
    this.latestValues[key] = value;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(props, presenceContext) {
    if (props.transformTemplate || this.props.transformTemplate) {
      this.scheduleRender();
    }
    this.prevProps = this.props;
    this.props = props;
    this.prevPresenceContext = this.presenceContext;
    this.presenceContext = presenceContext;
    for (let i = 0; i < propEventHandlers2.length; i++) {
      const key = propEventHandlers2[i];
      if (this.propEventSubscriptions[key]) {
        this.propEventSubscriptions[key]();
        delete this.propEventSubscriptions[key];
      }
      const listenerName = "on" + key;
      const listener = props[listenerName];
      if (listener) {
        this.propEventSubscriptions[key] = this.on(key, listener);
      }
    }
    this.prevMotionValues = updateMotionValuesFromProps2(this, this.scrapeMotionValuesFromProps(props, this.prevProps, this), this.prevMotionValues);
    if (this.handleChildMotionValue) {
      this.handleChildMotionValue();
    }
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(name) {
    return this.props.variants ? this.props.variants[name] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(child) {
    const closestVariantNode = this.getClosestVariantNode();
    if (closestVariantNode) {
      closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
      return () => closestVariantNode.variantChildren.delete(child);
    }
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(key, value) {
    const existingValue = this.values.get(key);
    if (value !== existingValue) {
      if (existingValue)
        this.removeValue(key);
      this.bindToMotionValue(key, value);
      this.values.set(key, value);
      this.latestValues[key] = value.get();
    }
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(key) {
    this.values.delete(key);
    const unsubscribe = this.valueSubscriptions.get(key);
    if (unsubscribe) {
      unsubscribe();
      this.valueSubscriptions.delete(key);
    }
    delete this.latestValues[key];
    this.removeValueFromRenderState(key, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(key) {
    return this.values.has(key);
  }
  getValue(key, defaultValue) {
    if (this.props.values && this.props.values[key]) {
      return this.props.values[key];
    }
    let value = this.values.get(key);
    if (value === void 0 && defaultValue !== void 0) {
      value = motionValue2(defaultValue === null ? void 0 : defaultValue, { owner: this });
      this.addValue(key, value);
    }
    return value;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(key, target) {
    let value = this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : this.getBaseTargetFromProps(this.props, key) ?? this.readValueFromInstance(this.current, key, this.options);
    if (value !== void 0 && value !== null) {
      if (typeof value === "string" && (isNumericalString2(value) || isZeroValueString2(value))) {
        value = parseFloat(value);
      } else if (!findValueType2(value) && complex2.test(target)) {
        value = getAnimatableNone4(key, target);
      }
      this.setBaseTarget(key, isMotionValue2(value) ? value.get() : value);
    }
    return isMotionValue2(value) ? value.get() : value;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(key, value) {
    this.baseTarget[key] = value;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(key) {
    const { initial } = this.props;
    let valueFromInitial;
    if (typeof initial === "string" || typeof initial === "object") {
      const variant = resolveVariantFromProps2(this.props, initial, this.presenceContext?.custom);
      if (variant) {
        valueFromInitial = variant[key];
      }
    }
    if (initial && valueFromInitial !== void 0) {
      return valueFromInitial;
    }
    const target = this.getBaseTargetFromProps(this.props, key);
    if (target !== void 0 && !isMotionValue2(target))
      return target;
    return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager2();
    }
    return this.events[eventName].add(callback);
  }
  notify(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].notify(...args);
    }
  }
};

// node_modules/motion/dist/es/motion-dom/dist/es/animation/utils/css-variables-conversion.mjs
var splitCSSVariableRegex2 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function parseCSSVariable2(current) {
  const match = splitCSSVariableRegex2.exec(current);
  if (!match)
    return [,];
  const [, token1, token2, fallback] = match;
  return [`--${token1 ?? token2}`, fallback];
}
var maxDepth2 = 4;
function getVariableValue2(current, element, depth = 1) {
  invariant2(depth <= maxDepth2, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`);
  const [token, fallback] = parseCSSVariable2(current);
  if (!token)
    return;
  const resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    const trimmed = resolved.trim();
    return isNumericalString2(trimmed) ? parseFloat(trimmed) : trimmed;
  }
  return isCSSVariableToken2(fallback) ? getVariableValue2(fallback, element, depth + 1) : fallback;
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function isNone2(value) {
  if (typeof value === "number") {
    return value === 0;
  } else if (value !== null) {
    return value === "none" || value === "0" || isZeroValueString2(value);
  } else {
    return true;
  }
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
var invalidTemplates2 = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function makeNoneKeyframesAnimatable2(unresolvedKeyframes, noneKeyframeIndexes, name) {
  let i = 0;
  let animatableTemplate = void 0;
  while (i < unresolvedKeyframes.length && !animatableTemplate) {
    const keyframe = unresolvedKeyframes[i];
    if (typeof keyframe === "string" && !invalidTemplates2.has(keyframe) && analyseComplexValue2(keyframe).values.length) {
      animatableTemplate = unresolvedKeyframes[i];
    }
    i++;
  }
  if (animatableTemplate && name) {
    for (const noneIndex of noneKeyframeIndexes) {
      unresolvedKeyframes[noneIndex] = getAnimatableNone4(name, animatableTemplate);
    }
  }
}

// node_modules/motion/dist/es/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var DOMKeyframesResolver2 = class extends KeyframeResolver2 {
  constructor(unresolvedKeyframes, onComplete, name, motionValue3, element) {
    super(unresolvedKeyframes, onComplete, name, motionValue3, element, true);
  }
  readKeyframes() {
    const { unresolvedKeyframes, element, name } = this;
    if (!element || !element.current)
      return;
    super.readKeyframes();
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      let keyframe = unresolvedKeyframes[i];
      if (typeof keyframe === "string") {
        keyframe = keyframe.trim();
        if (isCSSVariableToken2(keyframe)) {
          const resolved = getVariableValue2(keyframe, element.current);
          if (resolved !== void 0) {
            unresolvedKeyframes[i] = resolved;
          }
          if (i === unresolvedKeyframes.length - 1) {
            this.finalKeyframe = keyframe;
          }
        }
      }
    }
    this.resolveNoneKeyframes();
    if (!positionalKeys2.has(name) || unresolvedKeyframes.length !== 2) {
      return;
    }
    const [origin, target] = unresolvedKeyframes;
    const originType = findDimensionValueType2(origin);
    const targetType = findDimensionValueType2(target);
    if (originType === targetType)
      return;
    if (isNumOrPxType2(originType) && isNumOrPxType2(targetType)) {
      for (let i = 0; i < unresolvedKeyframes.length; i++) {
        const value = unresolvedKeyframes[i];
        if (typeof value === "string") {
          unresolvedKeyframes[i] = parseFloat(value);
        }
      }
    } else {
      this.needsMeasurement = true;
    }
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes, name } = this;
    const noneKeyframeIndexes = [];
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      if (unresolvedKeyframes[i] === null || isNone2(unresolvedKeyframes[i])) {
        noneKeyframeIndexes.push(i);
      }
    }
    if (noneKeyframeIndexes.length) {
      makeNoneKeyframesAnimatable2(unresolvedKeyframes, noneKeyframeIndexes, name);
    }
  }
  measureInitialState() {
    const { element, unresolvedKeyframes, name } = this;
    if (!element || !element.current)
      return;
    if (name === "height") {
      this.suspendedScrollY = window.pageYOffset;
    }
    this.measuredOrigin = positionalValues2[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    unresolvedKeyframes[0] = this.measuredOrigin;
    const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
    if (measureKeyframe !== void 0) {
      element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
    }
  }
  measureEndState() {
    const { element, name, unresolvedKeyframes } = this;
    if (!element || !element.current)
      return;
    const value = element.getValue(name);
    value && value.jump(this.measuredOrigin, false);
    const finalKeyframeIndex = unresolvedKeyframes.length - 1;
    const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
    unresolvedKeyframes[finalKeyframeIndex] = positionalValues2[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    if (finalKeyframe !== null && this.finalKeyframe === void 0) {
      this.finalKeyframe = finalKeyframe;
    }
    if (this.removedTransforms?.length) {
      this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
        element.getValue(unsetTransformName).set(unsetTransformValue);
      });
    }
    this.resolveNoneKeyframes();
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/render/dom/DOMVisualElement.mjs
var DOMVisualElement2 = class extends VisualElement2 {
  constructor() {
    super(...arguments);
    this.KeyframeResolver = DOMKeyframesResolver2;
  }
  sortInstanceNodePosition(a, b) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    return props.style ? props.style[key] : void 0;
  }
  removeValueFromRenderState(key, { vars, style }) {
    delete vars[key];
    delete style[key];
  }
  handleChildMotionValue() {
    if (this.childSubscription) {
      this.childSubscription();
      delete this.childSubscription;
    }
    const { children } = this.props;
    if (isMotionValue2(children)) {
      this.childSubscription = children.on("change", (latest) => {
        if (this.current) {
          this.current.textContent = `${latest}`;
        }
      });
    }
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/render/html/utils/render.mjs
function renderHTML2(element, { style, vars }, styleProp, projection) {
  Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
  for (const key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/html/HTMLVisualElement.mjs
function getComputedStyle3(element) {
  return window.getComputedStyle(element);
}
var HTMLVisualElement2 = class extends DOMVisualElement2 {
  constructor() {
    super(...arguments);
    this.type = "html";
    this.renderInstance = renderHTML2;
  }
  readValueFromInstance(instance, key) {
    if (transformProps2.has(key)) {
      return readTransformValue2(instance, key);
    } else {
      const computedStyle = getComputedStyle3(instance);
      const value = (isCSSVariableName2(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, { transformPagePoint }) {
    return measureViewportBox2(instance, transformPagePoint);
  }
  build(renderState, latestValues, props) {
    buildHTMLStyles2(renderState, latestValues, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps3(props, prevProps, visualElement);
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs
var camelCaseAttributes2 = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);

// node_modules/motion/dist/es/framer-motion/dist/es/render/svg/utils/render.mjs
function renderSVG2(element, renderState, _styleProp, projection) {
  renderHTML2(element, renderState, void 0, projection);
  for (const key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes2.has(key) ? camelToDash2(key) : key, renderState.attrs[key]);
  }
}

// node_modules/motion/dist/es/framer-motion/dist/es/render/svg/SVGVisualElement.mjs
var SVGVisualElement2 = class extends DOMVisualElement2 {
  constructor() {
    super(...arguments);
    this.type = "svg";
    this.isSVGTag = false;
    this.measureInstanceViewportBox = createBox2;
  }
  getBaseTargetFromProps(props, key) {
    return props[key];
  }
  readValueFromInstance(instance, key) {
    if (transformProps2.has(key)) {
      const defaultType = getDefaultValueType2(key);
      return defaultType ? defaultType.default || 0 : 0;
    }
    key = !camelCaseAttributes2.has(key) ? camelToDash2(key) : key;
    return instance.getAttribute(key);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps4(props, prevProps, visualElement);
  }
  build(renderState, latestValues, props) {
    buildSVGAttrs2(renderState, latestValues, this.isSVGTag, props.transformTemplate);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderSVG2(instance, renderState, styleProp, projection);
  }
  mount(instance) {
    this.isSVGTag = isSVGTag2(instance.tagName);
    super.mount(instance);
  }
};

// node_modules/motion/dist/es/framer-motion/dist/es/render/dom/create-visual-element.mjs
var createDomVisualElement2 = (Component3, options) => {
  return isSVGComponent2(Component3) ? new SVGVisualElement2(options) : new HTMLVisualElement2(options, {
    allowProjection: Component3 !== import_react39.Fragment
  });
};

// node_modules/motion/dist/es/framer-motion/dist/es/render/components/motion/create.mjs
var createMotionComponent2 = /* @__PURE__ */ createMotionComponentFactory2({
  ...animations2,
  ...gestureAnimations2,
  ...drag2,
  ...layout2
}, createDomVisualElement2);

// node_modules/motion/dist/es/framer-motion/dist/es/render/components/motion/proxy.mjs
var motion2 = /* @__PURE__ */ createDOMMotionComponentProxy2(createMotionComponent2);

// node_modules/motion/dist/es/framer-motion/dist/es/value/use-motion-value.mjs
var import_react40 = __toESM(require_react(), 1);
function useMotionValue(initial) {
  const value = useConstant2(() => motionValue2(initial));
  const { isStatic } = (0, import_react40.useContext)(MotionConfigContext2);
  if (isStatic) {
    const [, setLatest] = (0, import_react40.useState)(initial);
    (0, import_react40.useEffect)(() => value.on("change", setLatest), []);
  }
  return value;
}

// node_modules/motion/dist/es/framer-motion/dist/es/value/use-combine-values.mjs
function useCombineMotionValues(values, combineValues) {
  const value = useMotionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  updateValue();
  useIsomorphicLayoutEffect2(() => {
    const scheduleUpdate = () => frame2.preRender(updateValue, false, true);
    const subscriptions = values.map((v) => v.on("change", scheduleUpdate));
    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
      cancelFrame2(updateValue);
    };
  });
  return value;
}

// node_modules/motion/dist/es/framer-motion/dist/es/value/use-motion-template.mjs
function useMotionTemplate(fragments, ...values) {
  const numFragments = fragments.length;
  function buildValue() {
    let output = ``;
    for (let i = 0; i < numFragments; i++) {
      output += fragments[i];
      const value = values[i];
      if (value) {
        output += isMotionValue2(value) ? value.get() : value;
      }
    }
    return output;
  }
  return useCombineMotionValues(values.filter(isMotionValue2), buildValue);
}

// node_modules/motion/dist/es/motion/lib/react.mjs
"use client";

// app/components/ui/EvervaultCard.tsx
var import_react42 = __toESM(require_react(), 1);
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id5) => {
    window.$RefreshRuntime$.register(type, '"app/components/ui/EvervaultCard.tsx"' + id5);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/ui/EvervaultCard.tsx"
  );
  import.meta.hot.lastModified = "1745923155609.6396";
}
var EvervaultCard = ({
  text,
  className
}) => {
  _s();
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const [randomString, setRandomString] = (0, import_react42.useState)("");
  (0, import_react42.useEffect)(() => {
    let str = generateRandomString(1500);
    setRandomString(str);
  }, []);
  function onMouseMove({
    currentTarget,
    clientX,
    clientY
  }) {
    let {
      left,
      top
    } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    const str = generateRandomString(1500);
    setRandomString(str);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: cn("p-0.5  bg-transparent aspect-square  flex items-center justify-center w-full h-full relative", className), children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { onMouseMove, className: "group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(CardPattern, { mouseX, mouseY, randomString }, void 0, false, {
      fileName: "app/components/ui/EvervaultCard.tsx",
      lineNumber: 55,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "relative z-10 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "relative h-20 w-25 flex items-center justify-center text-white font-bold text-4xl p-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "absolute w-full h-full bg-white/[0.5] dark:bg-black/[0.8] blur-sm rounded-2xl" }, void 0, false, {
        fileName: "app/components/ui/EvervaultCard.tsx",
        lineNumber: 58,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: "dark:text-white text-black z-20 center text-3xl px-2 py-1", children: text }, void 0, false, {
        fileName: "app/components/ui/EvervaultCard.tsx",
        lineNumber: 59,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/ui/EvervaultCard.tsx",
      lineNumber: 57,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/ui/EvervaultCard.tsx",
      lineNumber: 56,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/ui/EvervaultCard.tsx",
    lineNumber: 54,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/ui/EvervaultCard.tsx",
    lineNumber: 53,
    columnNumber: 10
  }, this);
};
_s(EvervaultCard, "KSOJomR27WyfGQ4O40cWwagR//k=", false, function() {
  return [useMotionValue, useMotionValue];
});
_c14 = EvervaultCard;
function CardPattern({
  mouseX,
  mouseY,
  randomString
}) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = {
    maskImage,
    WebkitMaskImage: maskImage
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "pointer-events-none", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "absolute inset-0 rounded-2xl  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50" }, void 0, false, {
      fileName: "app/components/ui/EvervaultCard.tsx",
      lineNumber: 82,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(motion2.div, { className: "absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-700 opacity-0  group-hover/card:opacity-100 backdrop-blur-xl transition duration-500", style }, void 0, false, {
      fileName: "app/components/ui/EvervaultCard.tsx",
      lineNumber: 83,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(motion2.div, { className: "absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay  group-hover/card:opacity-100", style, children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500", children: randomString }, void 0, false, {
      fileName: "app/components/ui/EvervaultCard.tsx",
      lineNumber: 85,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/ui/EvervaultCard.tsx",
      lineNumber: 84,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/ui/EvervaultCard.tsx",
    lineNumber: 81,
    columnNumber: 10
  }, this);
}
_c24 = CardPattern;
var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var generateRandomString = (length) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length)).repeat(Math.ceil(100 / length) * 5);
  }
  return result;
};
var Icon = ({
  className,
  ...rest
}) => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className, ...rest, children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6v12m6-6H6" }, void 0, false, {
    fileName: "app/components/ui/EvervaultCard.tsx",
    lineNumber: 105,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/ui/EvervaultCard.tsx",
    lineNumber: 104,
    columnNumber: 10
  }, this);
};
_c33 = Icon;
var _c14;
var _c24;
var _c33;
$RefreshReg$(_c14, "EvervaultCard");
$RefreshReg$(_c24, "CardPattern");
$RefreshReg$(_c33, "Icon");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/_index.tsx
var import_jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id5) => {
    window.$RefreshRuntime$.register(type, '"app/routes/_index.tsx"' + id5);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/_index.tsx"
  );
  import.meta.hot.lastModified = "1745921846506.3662";
}
var heroVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18
    }
  }
};
var fadeUp = {
  hidden: {
    opacity: 0,
    y: 60
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
var fadeIn = {
  hidden: {
    opacity: 0,
    scale: 0.96
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "min-h-screen bg-white text-slate-900", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("header", { className: "sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "container mx-auto py-4 px-4 flex justify-between items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(FileCheck, { className: "h-8 w-8 text-indigo-600" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 71,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "font-semibold text-xl tracking-tight", children: "ReValidate" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 72,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 70,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("nav", { className: "hidden md:flex items-center gap-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#features", className: "text-slate-600 hover:text-indigo-600 transition text-sm font-medium", children: "features" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 77,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#how-it-works", className: "text-slate-600 hover:text-indigo-600 transition text-sm font-medium", children: "how it works" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 80,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#testimonials", className: "text-slate-600 hover:text-indigo-600 transition text-sm font-medium", children: "testimonials" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 83,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#pricing", className: "text-slate-600 hover:text-indigo-600 transition text-sm font-medium", children: "pricing" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 86,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 76,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Button, { className: "bg-indigo-600 hover:bg-indigo-700 shadow-sm", children: [
        "Get started",
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(ArrowRight, { className: "ml-2 h-4 w-4" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 92,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 90,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 69,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 68,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("section", { className: "relative overflow-hidden bg-slate-50 py-28", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 99,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "container relative mx-auto py-20 px-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(motion.div, { variants: heroVariants, initial: "hidden", whileInView: "show", viewport: {
          once: true,
          amount: 0.7
        }, className: "max-w-3xl mx-auto text-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(motion.div, { variants: fadeUp, className: "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 mb-6 ring-1 ring-inset ring-indigo-500/20", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { children: "Science that stands the test of time" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 106,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 105,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(motion.h1, { variants: fadeUp, className: "text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-indigo-500 leading-tight", children: "Restore trust in science through rigorous revalidation" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 108,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(motion.p, { variants: fadeUp, className: "text-xl text-slate-600 mb-8 leading-relaxed", children: "The replication crisis undermines scientific credibility. Our platform enables researchers to verify, replicate, and strengthen scientific studies with transparent methodologies." }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 111,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(motion.p, { variants: fadeUp, className: "text-lg font-medium mb-10 text-indigo-600", children: "Validate findings. Build confidence. Advance science." }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 116,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(motion.div, { variants: fadeUp, className: "flex flex-col sm:flex-row gap-4 justify-center mb-16", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Button, { size: "lg", className: "bg-indigo-600 hover:bg-indigo-700 shadow-md rounded-full px-8", children: [
              "Start revalidating",
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(ArrowRight, { className: "ml-2 h-5 w-5" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 122,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 120,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Button, { size: "lg", variant: "outline", className: "border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-full px-8", children: [
              "See how it works",
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(CheckCircle, { className: "ml-2 h-5 w-5" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 126,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 124,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 119,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(motion.div, { variants: fadeIn, className: "rounded-xl bg-white border border-slate-200 p-8 mb-12 shadow-sm hover:shadow-md transition-shadow duration-300", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "aspect-video bg-slate-50 rounded-lg flex items-center justify-center mb-6 overflow-hidden relative border border-slate-100", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px] opacity-40" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 131,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "z-10 flex flex-col items-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(FileCheck, { className: "h-16 w-16 text-indigo-200 mb-3" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 133,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-slate-400", children: "Dashboard preview: Grayscale interface with indigo highlights for actions and progress indicators" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 134,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 132,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 130,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-wrap justify-center gap-8 items-center", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-sm text-slate-500 font-medium", children: "Trusted by" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 141,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-wrap gap-8 justify-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "Stanford University" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 145,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "Nature" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 148,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "Science Foundation" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 151,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "MIT" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 154,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "OSF" }, void 0, false, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 157,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 144,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 140,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 129,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 101,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(motion.div, { initial: {
          opacity: 0,
          y: 40
        }, whileInView: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.9,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }, viewport: {
          once: true,
          amount: 0.7
        }, className: "text-center max-w-xl mx-auto", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-lg font-medium text-slate-700 mb-4", children: "Transform hypothesis to verified knowledge in a transparent, collaborative ecosystem" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 178,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "p-3 bg-indigo-50 rounded-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(BarChart3, { className: "h-8 w-8 text-indigo-600" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 184,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 183,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 182,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 164,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 100,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 98,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("section", { id: "features", className: "py-24 bg-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 mb-4 ring-1 ring-inset ring-indigo-500/20", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { children: "Why choose us" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 196,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 195,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h2", { className: "text-3xl font-bold mb-4", children: "Why researchers choose ReValidate" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 198,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-slate-600 max-w-2xl mx-auto", children: "Our platform provides the tools and framework needed to ensure scientific integrity" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 201,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 194,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "grid md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Card, { className: "p-8 border-slate-200 hover:shadow-lg transition-all duration-300 rounded-xl group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col items-start", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "p-3 bg-indigo-50 rounded-xl mb-6 group-hover:bg-indigo-100 transition-colors", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Search, { className: "h-8 w-8 text-indigo-600" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 210,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 209,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h3", { className: "text-xl font-semibold mb-3", children: "Transparent Methodology" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 212,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-slate-600 mb-6 leading-relaxed", children: "Detailed protocols and complete methodologies ensure true replicability and build trust in the scientific community." }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 215,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Button, { variant: "ghost", className: "text-indigo-600 p-0 hover:bg-transparent hover:text-indigo-700 group-hover:translate-x-1 transition-transform", children: [
            "Learn more ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(ArrowRight, { className: "ml-1 h-4 w-4" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 220,
              columnNumber: 30
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 219,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 208,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 207,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Card, { className: "p-8 border-slate-200 hover:shadow-lg transition-all duration-300 rounded-xl group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col items-start", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "p-3 bg-indigo-50 rounded-xl mb-6 group-hover:bg-indigo-100 transition-colors", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Shield, { className: "h-8 w-8 text-indigo-600" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 227,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 226,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h3", { className: "text-xl font-semibold mb-3", children: "Verification Framework" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 229,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-slate-600 mb-6 leading-relaxed", children: "Standardized protocols and statistical tools to verify or challenge existing research with confidence and accuracy." }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 232,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Button, { variant: "ghost", className: "text-indigo-600 p-0 hover:bg-transparent hover:text-indigo-700 group-hover:translate-x-1 transition-transform", children: [
            "Learn more ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(ArrowRight, { className: "ml-1 h-4 w-4" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 237,
              columnNumber: 30
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 236,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 225,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 224,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Card, { className: "p-8 border-slate-200 hover:shadow-lg transition-all duration-300 rounded-xl group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col items-start", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "p-3 bg-indigo-50 rounded-xl mb-6 group-hover:bg-indigo-100 transition-colors", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Users, { className: "h-8 w-8 text-indigo-600" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 244,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 243,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h3", { className: "text-xl font-semibold mb-3", children: "Collaborative Network" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 246,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-slate-600 mb-6 leading-relaxed", children: "Connect with peers for independent validation and strengthen the scientific community through collective expertise." }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 249,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Button, { variant: "ghost", className: "text-indigo-600 p-0 hover:bg-transparent hover:text-indigo-700 group-hover:translate-x-1 transition-transform", children: [
            "Learn more ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(ArrowRight, { className: "ml-1 h-4 w-4" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 254,
              columnNumber: 30
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 253,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 242,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 241,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 206,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 193,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 192,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("section", { className: "flex flex-col items-center py-0 px-0 bg-white w-full min-h-[350px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-full h-[350px] md:h-[420px] flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(EvervaultCard, { text: "Bringing trust with math", className: "w-full h-full" }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 265,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 264,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 263,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("section", { id: "how-it-works", className: "py-24 bg-slate-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 mb-4 ring-1 ring-inset ring-indigo-500/20", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { children: "The process" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 274,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 273,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h2", { className: "text-3xl font-bold mb-4", children: "Revalidation in three simple steps" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 276,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-lg text-slate-600 max-w-2xl mx-auto", children: "Our structured approach ensures consistency and reliability across all revalidation projects." }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 279,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 272,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "hidden md:block absolute top-1/2 left-[20%] right-[20%] h-0.5 bg-indigo-100 -translate-y-1/2 z-0" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 285,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col items-center text-center relative z-10 bg-slate-50 p-6 rounded-xl", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 shadow-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-indigo-600 font-bold text-lg", children: "1" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 288,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 287,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h3", { className: "text-xl font-semibold mb-3", children: "Submit Study" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 290,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-slate-600 mb-4 leading-relaxed", children: "Upload original research data and methodology for revalidation through our secure platform." }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 291,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "p-2 bg-white rounded-full shadow-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Search, { className: "h-6 w-6 text-indigo-600" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 296,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 295,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 286,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col items-center text-center relative z-10 bg-slate-50 p-6 rounded-xl", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 shadow-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-indigo-600 font-bold text-lg", children: "2" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 301,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 300,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h3", { className: "text-xl font-semibold mb-3", children: "Verify Process" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 303,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-slate-600 mb-4 leading-relaxed", children: "Independent researchers replicate experiments following standardized protocols with complete transparency." }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 304,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "p-2 bg-white rounded-full shadow-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Clock, { className: "h-6 w-6 text-indigo-600" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 309,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 308,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 299,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col items-center text-center relative z-10 bg-slate-50 p-6 rounded-xl", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 shadow-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-indigo-600 font-bold text-lg", children: "3" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 314,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 313,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h3", { className: "text-xl font-semibold mb-3", children: "Publish Results" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 316,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-slate-600 mb-4 leading-relaxed", children: "Receive detailed revalidation reports with confidence metrics and recommendations for improvement." }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 317,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "p-2 bg-white rounded-full shadow-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Trophy, { className: "h-6 w-6 text-indigo-600" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 322,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 321,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 312,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 284,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mt-16 text-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Button, { className: "bg-indigo-600 hover:bg-indigo-700 shadow-md rounded-full px-8", children: [
        "Start the revalidation process",
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(ArrowRight, { className: "ml-2 h-4 w-4" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 329,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 327,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 326,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 271,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 270,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("section", { className: "py-20 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h2", { className: "text-2xl md:text-3xl font-bold mb-6", children: "Strengthen the foundation of scientific knowledge" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 338,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Button, { size: "lg", className: "bg-white text-indigo-700 hover:bg-slate-100 shadow-lg rounded-full px-8", children: "Join the revalidation movement" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 341,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 337,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 336,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("section", { id: "testimonials", className: "py-24 bg-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 mb-4 ring-1 ring-inset ring-indigo-500/20", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { children: "Testimonials" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 352,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 351,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h2", { className: "text-3xl font-bold mb-4", children: "What researchers are saying" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 354,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-slate-600 max-w-2xl mx-auto", children: "Hear from scientists who have strengthened their research through our platform" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 357,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 350,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Card, { className: "p-8 border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 border-2 border-white shadow-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-indigo-600 font-medium", children: "JD" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 367,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 366,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h4", { className: "font-semibold", children: "Dr. Jane Doe" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 370,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-sm text-slate-500", children: "Neuroscience Professor" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 371,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 369,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 365,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mb-4 text-indigo-50 relative", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "absolute text-indigo-100 top-0 left-0 transform -translate-x-2 -translate-y-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-8 h-8 opacity-20", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 379,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 380,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 378,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 377,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 376,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-slate-600 mb-6 leading-relaxed", children: '"ReValidate helped confirm our key findings while identifying important methodological improvements. Our work is now stronger and more credible."' }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 384,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex text-indigo-500 mt-auto", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Star, { className: "h-5 w-5 fill-current" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 390,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Star, { className: "h-5 w-5 fill-current" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 391,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Star, { className: "h-5 w-5 fill-current" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 392,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Star, { className: "h-5 w-5 fill-current" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 393,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Star, { className: "h-5 w-5 fill-current" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 394,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 389,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 364,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 363,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Card, { className: "p-8 border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 border-2 border-white shadow-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-indigo-600 font-medium", children: "MS" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 402,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 401,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h4", { className: "font-semibold", children: "Dr. Mark Smith" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 405,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-sm text-slate-500", children: "Clinical Research Director" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 406,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 404,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 400,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mb-4 text-indigo-50 relative", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "absolute text-indigo-100 top-0 left-0 transform -translate-x-2 -translate-y-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-8 h-8 opacity-20", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 414,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 415,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 413,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 412,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 411,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-slate-600 mb-6 leading-relaxed", children: `"The platform's rigorous approach revealed subtle statistical issues in our initial analysis that we were able to correct before publication."` }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 419,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex text-indigo-500 mt-auto", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Star, { className: "h-5 w-5 fill-current" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 425,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Star, { className: "h-5 w-5 fill-current" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 426,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Star, { className: "h-5 w-5 fill-current" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 427,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Star, { className: "h-5 w-5 fill-current" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 428,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Star, { className: "h-5 w-5 fill-current" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 429,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 424,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 399,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 398,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Card, { className: "p-8 border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 border-2 border-white shadow-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-indigo-600 font-medium", children: "AL" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 437,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 436,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h4", { className: "font-semibold", children: "Dr. Anna Lee" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 440,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-sm text-slate-500", children: "Psychology Researcher" }, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 441,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 439,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 435,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mb-4 text-indigo-50 relative", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "absolute text-indigo-100 top-0 left-0 transform -translate-x-2 -translate-y-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-8 h-8 opacity-20", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 449,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 450,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 448,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 447,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 446,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-slate-600 mb-6 leading-relaxed", children: '"ReValidate is transforming how we approach scientific validation. The transparent ecosystem builds confidence in findings across disciplines."' }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 454,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex text-indigo-500 mt-auto", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Star, { className: "h-5 w-5 fill-current" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 460,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Star, { className: "h-5 w-5 fill-current" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 461,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Star, { className: "h-5 w-5 fill-current" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 462,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Star, { className: "h-5 w-5 fill-current" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 463,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Star, { className: "h-5 w-5 fill-current" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 464,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 459,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 434,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 433,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 362,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mt-16 text-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-slate-500 mb-6 font-medium", children: "Featured in" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 470,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-wrap justify-center gap-12 items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "Science" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 472,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "Nature" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 475,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "PNAS" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 478,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "Cell" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 481,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 471,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 469,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 349,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 348,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("section", { className: "py-24 bg-slate-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "container mx-auto px-4 max-w-4xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "bg-white rounded-2xl p-12 shadow-xl border border-slate-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 mb-4 ring-1 ring-inset ring-indigo-500/20", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { children: "Get started" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 495,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 494,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: "Ready to strengthen scientific integrity?" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 497,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 493,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("ul", { className: "mb-8 space-y-4 max-w-md mx-auto", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { className: "flex items-start", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex-shrink-0 p-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(CheckCircle, { className: "h-5 w-5 text-indigo-600 mt-0.5" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 504,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 503,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "ml-3 text-slate-700", children: "Validate methods and reproduce results with confidence" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 506,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 502,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { className: "flex items-start", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex-shrink-0 p-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(CheckCircle, { className: "h-5 w-5 text-indigo-600 mt-0.5" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 512,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 511,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "ml-3 text-slate-700", children: "Join a community committed to scientific excellence" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 514,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 510,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { className: "flex items-start", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex-shrink-0 p-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(CheckCircle, { className: "h-5 w-5 text-indigo-600 mt-0.5" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 520,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 519,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "ml-3 text-slate-700", children: "Enhance the credibility and impact of your research" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 522,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 518,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 501,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Button, { size: "lg", className: "bg-indigo-600 hover:bg-indigo-700 shadow-lg rounded-full px-8", children: [
        "Get started today",
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Clock, { className: "ml-2 h-5 w-5" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 530,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 528,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 527,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 492,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 491,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 490,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("footer", { className: "bg-white pt-16 pb-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "grid md:grid-cols-4 gap-8 mb-12", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(FileCheck, { className: "h-6 w-6 text-indigo-600" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 543,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "font-semibold text-lg", children: "ReValidate" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 544,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 542,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-slate-500 mb-4 leading-relaxed", children: "Strengthening scientific integrity through transparent revalidation." }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 546,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#", className: "text-slate-400 hover:text-indigo-600 transition", "aria-label": "Facebook", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("svg", { className: "h-5 w-5", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { fillRule: "evenodd", d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z", clipRule: "evenodd" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 553,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 552,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 551,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#", className: "text-slate-400 hover:text-indigo-600 transition", "aria-label": "Twitter", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("svg", { className: "h-5 w-5", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 558,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 557,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 556,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#", className: "text-slate-400 hover:text-indigo-600 transition", "aria-label": "GitHub", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("svg", { className: "h-5 w-5", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { fillRule: "evenodd", d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z", clipRule: "evenodd" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 563,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 562,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 561,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#", className: "text-slate-400 hover:text-indigo-600 transition", "aria-label": "Dribbble", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("svg", { className: "h-5 w-5", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { fillRule: "evenodd", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z", clipRule: "evenodd" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 568,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 567,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 566,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 550,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 541,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h4", { className: "font-semibold mb-4 text-slate-800", children: "Platform" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 574,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#features", className: "text-slate-500 hover:text-indigo-600 transition text-sm", children: "Features" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 577,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 576,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#how-it-works", className: "text-slate-500 hover:text-indigo-600 transition text-sm", children: "How it works" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 582,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 581,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#pricing", className: "text-slate-500 hover:text-indigo-600 transition text-sm", children: "Pricing" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 587,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 586,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#", className: "text-slate-500 hover:text-indigo-600 transition text-sm", children: "FAQs" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 592,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 591,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 575,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 573,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h4", { className: "font-semibold mb-4 text-slate-800", children: "Company" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 599,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#", className: "text-slate-500 hover:text-indigo-600 transition text-sm", children: "About" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 602,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 601,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#", className: "text-slate-500 hover:text-indigo-600 transition text-sm", children: "Blog" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 607,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 606,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#", className: "text-slate-500 hover:text-indigo-600 transition text-sm", children: "Careers" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 612,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 611,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#", className: "text-slate-500 hover:text-indigo-600 transition text-sm", children: "Contact" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 617,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 616,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 600,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 598,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h4", { className: "font-semibold mb-4 text-slate-800", children: "Legal" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 624,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#", className: "text-slate-500 hover:text-indigo-600 transition text-sm", children: "Privacy Policy" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 627,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 626,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#", className: "text-slate-500 hover:text-indigo-600 transition text-sm", children: "Terms of Service" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 632,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 631,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "#", className: "text-slate-500 hover:text-indigo-600 transition text-sm", children: "Data Handling" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 637,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 636,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 625,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 623,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 540,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Separator, { className: "bg-slate-200 mb-8" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 644,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col md:flex-row justify-between items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-sm text-slate-500 mb-4 md:mb-0", children: "\xA9 2023 ReValidate. All rights reserved." }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 646,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-xs text-slate-400 mr-2", children: "Made with" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 650,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-indigo-500", children: "\u2665" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 651,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-xs text-slate-400 ml-2", children: "for scientific integrity" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 652,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 649,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 645,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 539,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 538,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 66,
    columnNumber: 10
  }, this);
}
_c15 = Index;
var _c15;
$RefreshReg$(_c15, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default
};
/*! Bundled license information:

lucide-react/dist/esm/defaultAttributes.js:
  (**
   * @license lucide-react v0.321.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/createLucideIcon.js:
  (**
   * @license lucide-react v0.321.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/arrow-right.js:
  (**
   * @license lucide-react v0.321.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/bar-chart-3.js:
  (**
   * @license lucide-react v0.321.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/check-circle.js:
  (**
   * @license lucide-react v0.321.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/clock.js:
  (**
   * @license lucide-react v0.321.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/file-check.js:
  (**
   * @license lucide-react v0.321.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/search.js:
  (**
   * @license lucide-react v0.321.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/shield.js:
  (**
   * @license lucide-react v0.321.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/star.js:
  (**
   * @license lucide-react v0.321.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/trophy.js:
  (**
   * @license lucide-react v0.321.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/users.js:
  (**
   * @license lucide-react v0.321.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.321.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=/build/routes/_index-53C4BAB5.js.map
