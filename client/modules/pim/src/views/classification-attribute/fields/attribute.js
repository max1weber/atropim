/*
 * This file is part of AtroPIM.
 *
 * AtroPIM - Open Source PIM application.
 * Copyright (C) 2020 AtroCore UG (haftungsbeschränkt).
 * Website: https://atropim.com
 *
 * AtroPIM is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AtroPIM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AtroPIM. If not, see http://www.gnu.org/licenses/.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "AtroPIM" word.
 */

Espo.define('pim:views/classification-attribute/fields/attribute', 'views/fields/link',
    Dep => Dep.extend({

        selectBoolFilterList: ['notLinkedWithClassificationAttribute'],

        boolFilterData: {
            notLinkedWithClassificationAttribute() {
                return {
                    classificationId: this.model.get('classificationId'),
                    channelsIds: this.model.get('channelsIds')
                };
            }
        },

        setup() {
            Dep.prototype.setup.call(this);

            this.listenTo(this.model, 'change:attributeId', () => {
                this.setAttributeData();
            });
        },

        select: function (model) {
            Dep.prototype.select.call(this, model);

            this.model.trigger('change:attribute', model);
            this.model.set('isRequired', model.get('isRequired'))
        },

        setAttributeData() {
            this.model.set('attributeType', null);

            if (this.model.get('attributeId')) {
                this.ajaxGetRequest(`Attribute/${this.model.get('attributeId')}`).success(attribute => {
                    this.model.set('attributeType', attribute.type);
                    this.model.set('maxLength', attribute.maxLength);
                    this.model.set('countBytesInsteadOfCharacters', attribute.countBytesInsteadOfCharacters);
                    this.model.set('min', attribute.min);
                    this.model.set('max', attribute.max);
                });
            }
        },

    })
);

