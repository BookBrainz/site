/*
 * Copyright (C) 2018 Shivam Tripathi
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import {
	extractImportEntityProps,
	extractLayoutProps
} from '../../helpers/props';
import ImportEntityPages from '../../components/pages/import-entities';
import Layout from '../../containers/layout';
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';


const propsTarget = document.getElementById('props');
const props = propsTarget ? JSON.parse(propsTarget.innerHTML) : {};

const entityType = _.get(props, 'importEntity.type');
const Child = ImportEntityPages[entityType];

if (!Child) {
	throw new Error('Controller::ImportEntity - Invalid entity type');
}

const markup = (
	<Layout {...extractLayoutProps(props)}>
		<Child {...extractImportEntityProps(props)}/>
	</Layout>
);


ReactDOM.hydrate(markup, document.getElementById('target'));
