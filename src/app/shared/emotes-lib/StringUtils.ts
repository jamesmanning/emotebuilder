import { EmoteObject } from './EmoteObject';
import { IEmoteDataEntry } from './IEmoteDataEntry';
import { IHashMapOfStrings } from './IHashMapOfStrings';
import { HtmlOutputData } from './HtmlOutputData';

export class StringUtils {
    // don't need to support the -ms- prefix,  so only need hyphenate
    // see https://github.com/facebook/react/blob/76c87da026bdab63b5b109e3c073a1db74896ed6/src/vendor/core/hyphenateStyleName.js
    // and https://github.com/facebook/react/blob/76c87da026bdab63b5b109e3c073a1db74896ed6/src/vendor/core/hyphenate.js
    private static uppercasePattern = /([A-Z])/g;
    static convertCamelCaseToHyphenated(styleName: string): string {
      return styleName.replace(this.uppercasePattern, '-$1').toLowerCase();
    }
    // see https://github.com/facebook/react/blob/76c87da026bdab63b5b109e3c073a1db74896ed6/src/vendor/core/camelizeStyleName.js
    // and https://github.com/facebook/react/blob/76c87da026bdab63b5b109e3c073a1db74896ed6/src/vendor/core/camelize.js
    private static hyphenPattern = /-(.)/g;
    static convertHyphenatedToCamelCase(styleName: string): string {
      return styleName.replace(this.hyphenPattern, function(_, character) {
        return character.toUpperCase();
      });
    }

    // simplified version of what react does to generate the style attribute from an object
    // https://github.com/facebook/react/blob/3b96650e39ddda5ba49245713ef16dbc52d25e9e/src/renderers/dom/shared/CSSPropertyOperations.js#L130-L147
    static createMarkupForStyles(styles: IHashMapOfStrings): string {
      var serialized = '';
      for (var styleName in styles) {
        // if (!styles.hasOwnProperty(styleName)) {
        //   continue;
        // }
        var styleValue = styles[styleName];
        if (styleValue != null) {
          let hyphenatedStyleName = StringUtils.convertCamelCaseToHyphenated(styleName);
          serialized += `${hyphenatedStyleName}: ${styleValue};`
        }
      }
      return serialized || null;
    }

    static createHtmlString(tag: string, text: string, styles: IHashMapOfStrings): string {
      if (!text) {
        return '';
      }
      var styleString = this.createMarkupForStyles(styles);
      return `<${tag} style="${styleString}">${text}</${tag}>`;
    }

    static createInnerHtml(htmlOutputData: HtmlOutputData): string {
      let ret = '';
      ret += this.createHtmlString('em', htmlOutputData.emText, htmlOutputData.emStyles) || '';
      ret += this.createHtmlString('strong', htmlOutputData.strongText, htmlOutputData.strongStyles) || '';
      ret += htmlOutputData.altText || '';

      return ret;
    }
}
