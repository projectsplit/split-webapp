import { BeautifulMentionsTheme } from 'lexical-beautiful-mentions';
import { HeadingNode } from '@lexical/rich-text';
import { createBeautifulMentionNode } from 'lexical-beautiful-mentions';
import { FilterMention } from '../FilterMention/FilterMention';

const beautifulMentionsTheme: BeautifulMentionsTheme = {
  'payer:': {
    trigger: 'trigger',
    value: 'value',
    container: 'container',
    containerFocused: 'containerFocused',
  },
  'participant:': {
    trigger: 'trigger',
    value: 'value',
    container: 'container',
    containerFocused: 'containerFocused',
  },
  'sender:': {
    trigger: 'trigger',
    value: 'value',
    container: 'container',
    containerFocused: 'containerFocused',
  },
  'receiver:': {
    trigger: 'trigger',
    value: 'value',
    container: 'container',
    containerFocused: 'containerFocused',
  },
  'before:': {
    trigger: 'trigger',
    value: 'value',
    container: 'container',
    containerFocused: 'containerFocused',
  },
  'during:': {
    trigger: 'trigger',
    value: 'value',
    container: 'container',
    containerFocused: 'containerFocused',
  },
  'after:': {
    trigger: 'trigger',
    value: 'value',
    container: 'container',
    containerFocused: 'containerFocused',
  },
  'category:': {
    trigger: 'trigger',
    value: 'value',
    container: 'container',
    containerFocused: 'containerFocused',
  },
};

const theme = {
  text: {
    bold: 'editor-bold',
  },
  beautifulMentions: beautifulMentionsTheme,
};

const onError = (error: Error): void => {
  console.error(error);
};

export const initialConfig = {
  namespace: 'MyEditor',
  theme,
  onError,
  nodes: [HeadingNode, ...createBeautifulMentionNode(FilterMention)],
};
