import '../sass/style.sass'
import { html, render } from 'lit-html';

import './promotion-element';
const PromotionElement = html`<promotion-element></promotion-element>`
render(PromotionElement, document.body);
