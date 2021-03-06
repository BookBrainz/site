/*
 * Copyright (C) 2020  Nicolas Pelletier
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

export const UPDATE_ANNOTATION = 'UPDATE_ANNOTATION';

export type Action = {
	type: string,
	value?: unknown,
	meta?: {
		debounce?: string
	}
};

/**
 * Produces an action indicating that the annotation for the editing form
 * should be updated with the provided value. The action is marked to be
 * debounced by the keystroke debouncer defined for redux-debounce.
 *
 * @param {string} value - The new value to be used for the revision note.
 * @returns {Action} The resulting UPDATE_ANNOTATION action.
 */
export function debounceUpdateAnnotation(value: string): Action {
	return {
		meta: {debounce: 'keystroke'},
		type: UPDATE_ANNOTATION,
		value
	};
}
