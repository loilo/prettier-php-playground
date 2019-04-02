<template>
  <aside class="sidebar">
    <details class="sidebar__group" open>
      <summary class="sidebar__headline">Options</summary>
      <label class="sidebar__option" title="The line length where Prettier will try wrap.">
        --print-width
        <input
          type="number"
          :value="prettierOptions.printWidth"
          @input="setPrettierOption(['printWidth', +$event.currentTarget.value])"
          min="0"
          step="1"
          size="3"
        >
      </label>
      <label class="sidebar__option" title="Number of spaces per indentation level.">
        --tab-width
        <input
          type="number"
          :value="prettierOptions.tabWidth"
          @input="setPrettierOption(['tabWidth', +$event.currentTarget.value])"
          min="0"
          step="1"
          size="2"
        >
      </label>
      <label class="sidebar__option" title="Indent with tabs instead of spaces.">
        <input
          type="checkbox"
          :checked="prettierOptions.useTabs"
          @change="setPrettierOption(['useTabs', !prettierOptions.useTabs])"
        > --use-tabs
      </label>
      <label class="sidebar__option" title="Use single quotes instead of double quotes.">
        <input
          type="checkbox"
          :checked="prettierOptions.singleQuote"
          @change="setPrettierOption(['singleQuote', !prettierOptions.singleQuote])"
        > --single-quote
      </label>
    </details>
    <details class="sidebar__group" open>
      <summary class="sidebar__headline">PHP</summary>
      <label class="sidebar__option" title="When to insert trailing commas">
        --trailing-comma
        <select
          :value="prettierOptions.trailingComma"
          @change="setPrettierOption(['trailingComma', $event.currentTarget.value])"
        >
          <option value="all">all</option>
          <option value="php7.2">PHP 7.2</option>
          <option value="php5">PHP 5</option>
          <option value="none" selected>none</option>
        </select>
      </label>
      <label class="sidebar__option" title="Where to put opening braces">
        --brace-style
        <select
          :value="prettierOptions.braceStyle"
          @change="setPrettierOption(['braceStyle', $event.currentTarget.value])"
        >
          <option value="psr-2" selected>PSR-2</option>
          <option value="1tbs">1TBS</option>
        </select>
      </label>
    </details>
    <details class="sidebar__group" open>
      <summary class="sidebar__headline">Special</summary>
      <label
        class="sidebar__option"
        title="Insert @format pragma into file's first docblock comment."
      >
        <input
          type="checkbox"
          :checked="prettierOptions.insertPragma"
          @change="setPrettierOption(['insertPragma', !prettierOptions.insertPragma])"
        > --insert-pragma
      </label>
      <label
        class="sidebar__option"
        title="Require either '@prettier' or '@format' to be present in the file's first docblock comment in order for it to be formatted."
      >
        <input
          type="checkbox"
          :checked="prettierOptions.requirePragma"
          @change="setPrettierOption(['requirePragma', !prettierOptions.requirePragma])"
        > --require-pragma
      </label>
    </details>
    <details class="sidebar__group" open>
      <summary class="sidebar__headline">Debug</summary>
      <label class="sidebar__option">
        <input
          type="checkbox"
          :checked="editorOptions.ast"
          @change="setEditorOption(['ast', !editorOptions.ast])"
        > show AST
      </label>
    </details>

    <div class="sidebar__group">
      <GitHubButton @click="resetOptions">Reset to defaults</GitHubButton>
    </div>
  </aside>
</template>

<script>
import GitHubButton from '../Button/GitHubButton'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    GitHubButton
  },
  computed: {
    ...mapState(['prettierOptions', 'editorOptions'])
  },
  methods: {
    ...mapMutations(['resetOptions', 'setPrettierOption', 'setEditorOption'])
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  z-index: 10000; // above logo
  background: #fafafa;
  height: 100%;
  width: 100%;
  max-width: 414px;
  box-shadow: 0 0 40px 3px rgba(0, 0, 0, 0.25);
  border-right: 1px solid #ddd;

  @media (min-width: 768px) {
    position: static;
    width: auto;
    max-width: none;
    height: auto;
    z-index: initial;
    box-shadow: none;
  }

  &__group {
    padding: 15px 10px 10px;
    border-bottom: 1px solid #ddd;

    &:last-child {
      border-bottom: none;
    }
  }

  &__headline {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 5px;
    margin: 0;
    cursor: pointer;
  }

  /* &__headline,
  &__option {
    margin-left: 10px;
  } */

  &__option {
    font-family: Consolas, Courier New, Courier, monospace;
    margin: 10px 0;
    display: block;
  }

  input[type='number'] {
    max-width: 40px;
  }
}
</style>
