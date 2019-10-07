// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';
import dataJson from '../data/data.json';

// Extend the LitElement base class
class PromotionElement extends LitElement {
    static get properties() {
        return {
            isNewCustomerView: { type: Boolean }
        };
    }
    constructor() {
        super();
        this.isNewCustomerView = false;
    }

    renderSingUpButton() {
        return html`${this.isNewCustomerView ?
            html`<button class="btn sing-up" name="button">Sing Up</button>` :
            html``}`;
    }

    /**
     * Implement `render` to define a template for your element.
     *
     * You must provide an implementation of `render` for any element
     * that uses LitElement as a base class.
     */
    render() {
        dataJson.sort((a, b) => {
            return a.sequence - b.sequence;
        });

        const isNewCustomer = promotion => {
            if (this.isNewCustomerView) {
                return promotion.onlyNewCustomers;
            } else {
                return true;
            }
        };

        /**
         * `render` must return a lit-html `TemplateResult`.
         *
         * To create a `TemplateResult`, tag a JavaScript template literal
         * with the `html` helper function:
         */
        return html`
            <!-- template content -->
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <div class="main-btn">
                <button class="all-promotions active" @click="${this.managePromotionsDisplay}">All Promotions</button>
                <button class="new-customers" @click="${this.managePromotionsDisplay}">New Customers</button>
            </div>
            ${dataJson
                .filter(isNewCustomer)
                .map(promotion => html`
                <div class="each-promotion">
                    <img srcset="
                        https://via.placeholder.com/420x210/E1E5EE 420w,
                        https://via.placeholder.com/900x450/E1E5EE 900w"
                        src="https://via.placeholder.com/420">
                    <div class="name">${promotion.name}</div>
                    <div class="description">${promotion.description}</div>
                    <div class="secondary-btn">
                        <button class="terms-and-condition">Terms and Conditions</button>
                        ${this.renderSingUpButton()}
                    </div>
                </div>
            `)}
    `;
    }

    managePromotionsDisplay(e) {
        e.target.className.includes("new-customers") ? this.handleToggle(e, true) : this.handleToggle(e, false);
    }

    handleToggle(e, goingToNewCustomerView) {
        e.target.className = e.target.className + " active";
        if (goingToNewCustomerView) {
            this.removeActiveClassFromThisClass("all-promotions");
            return this.isNewCustomerView = true;
        } else {
            this.removeActiveClassFromThisClass("new-customers");
            return this.isNewCustomerView = false;
        }
    }

    removeActiveClassFromThisClass(className) {
        let allPromotionClasses = document.querySelector(`.${className}`);
        allPromotionClasses.classList.remove("active");
    }

    createRenderRoot() {
        /**
         * Render template in light DOM. Note that shadow DOM features like
         * encapsulated CSS are unavailable.
         */
        return this;
    }
}
// Register the new element with the browser.
customElements.define('promotion-element', PromotionElement);