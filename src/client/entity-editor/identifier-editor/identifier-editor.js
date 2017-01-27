/*
 * Copyright (C) 2016  Ben Ockmore
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

import {Button, Col, Modal, Row} from 'react-bootstrap';
import {addIdentifierRow, hideIdentifierEditor} from './actions';
import IdentifierRow from './identifier-row';
import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';


const IdentifierEditor = ({
	identifiers,
	typeOptions,
	onAddIdentifier,
	onClose,
	show
}) => {
	const noIdentifiersTextClass =
		classNames('text-center', {hidden: identifiers.size});
	return (
		<Modal bsSize="large" show={show} onHide={onClose}>
			<Modal.Header>
				<Modal.Title>
					Identifier Editor
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<div className={noIdentifiersTextClass}>
					<p className="text-muted">This entity has no identifiers</p>
				</div>
				<div>
					{
						identifiers.map((identifier, rowId) =>
							<IdentifierRow
								index={rowId}
								key={rowId}
								typeOptions={typeOptions}
							/>
						).toArray()
					}
				</div>
				<Row>
					<Col className="text-right" md={3} mdOffset={9}>
						<Button bsStyle="success" onClick={onAddIdentifier}>
							Add identifier
						</Button>
					</Col>
				</Row>
			</Modal.Body>

			<Modal.Footer>
				<Button bsStyle="primary" onClick={onClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};
IdentifierEditor.displayName = 'IdentifierEditor';
IdentifierEditor.propTypes = {
	identifiers: React.PropTypes.object,
	show: React.PropTypes.bool,
	typeOptions: React.PropTypes.array,
	onAddIdentifier: React.PropTypes.func,
	onClose: React.PropTypes.func
};

function mapStateToProps(state) {
	return {
		identifiers: state.get('identifierEditor')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onClose: () => dispatch(hideIdentifierEditor()),
		onAddIdentifier: () => dispatch(addIdentifierRow())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(IdentifierEditor);
