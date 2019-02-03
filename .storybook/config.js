import centered from "@storybook/addon-centered";
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from "@storybook/addon-knobs";
import { withNotes } from "@storybook/addon-notes";

function loadStories() {
  require('../lib/PromiseButton.stories.js');
}

addDecorator(centered);
addDecorator(withKnobs);
addDecorator(withNotes);
configure(loadStories, module);
