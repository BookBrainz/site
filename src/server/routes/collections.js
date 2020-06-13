/*
 * Copyright (C) 2020 Prabal Singh
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

import * as propHelpers from '../../client/helpers/props';
import * as utils from '../helpers/utils';
import {escapeProps, generateProps} from '../helpers/props';
import CollectionsPage from '../../client/components/pages/collections';
import Layout from '../../client/containers/layout';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import _ from 'lodash';
import express from 'express';
import {getOrderedPublicCollections} from '../helpers/collections';
import target from '../templates/target';


const router = express.Router();

/* GET revisions page. */
router.get('/', async (req, res, next) => {
	const {orm} = req.app.locals;
	const size = req.query.size ? parseInt(req.query.size, 10) : 20;
	const from = req.query.from ? parseInt(req.query.from, 10) : 0;
	let type = req.query.type ? req.query.type : null;
	const entityTypes = _.keys(utils.getEntityModels(orm));
	if (!entityTypes.includes(type)) {
		type = null;
	}

	function render(results, nextEnabled) {
		const props = generateProps(req, res, {
			entityTypes,
			from,
			nextEnabled,
			results,
			showOwner: true,
			size
		});

		/*
		 * Renders react components server side and injects markup into target
		 * file object spread injects the app.locals variables into React as
		 * props
		 */
		const markup = ReactDOMServer.renderToString(
			<Layout {...propHelpers.extractLayoutProps(props)}>
				<CollectionsPage {...propHelpers.extractChildProps(props)}/>
			</Layout>
		);

		res.send(target({
			markup,
			props: escapeProps(props),
			script: '/js/collections.js',
			title: 'All Collections'
		}));
	}

	try {
		// fetch 1 more revision than required to check nextEnabled
		const orderedRevisions = await getOrderedPublicCollections(from, size + 1, type, orm);
		const {newResultsArray, nextEnabled} = utils.getNextEnabledAndResultsArray(orderedRevisions, size);
		return render(newResultsArray, nextEnabled);
	}
	catch (err) {
		return next(err);
	}
});


// eslint-disable-next-line consistent-return
router.get('/collections', async (req, res, next) => {
	const {orm} = req.app.locals;
	const size = req.query.size ? parseInt(req.query.size, 10) : 20;
	const from = req.query.from ? parseInt(req.query.from, 10) : 0;
	let type = req.query.type ? req.query.type : null;
	const entityTypes = _.keys(utils.getEntityModels(orm));
	if (!entityTypes.includes(type)) {
		type = null;
	}

	try {
		const orderedRevisions = await getOrderedPublicCollections(from, size, type, orm);
		res.send(orderedRevisions);
	}
	catch (err) {
		return next(err);
	}
});

export default router;
