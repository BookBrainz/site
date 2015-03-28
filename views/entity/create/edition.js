var ko = require('knockout');
var request = require('superagent');
var $ = require('jquery');
require('superagent-bluebird-promise');

function CreateEditionViewModel() {
	var self = this;

	self.pageAliases = function() {
		self.page(1);
	};

	self.pageData = function() {
		self.page(2);
	};

	self.pageSubmit = function() {
		self.page(3);
	};

	self.submitRevision = function() {
		request.post('/edition/create/handler')
			.send({
				aliases: [{
					name: self.newName,
					sortName: self.newSortName,
					languageId: parseInt(self.aliasLanguageId),
					languageText: $('#aliasLanguageSelect :selected').text(),
					dflt: true,
					primary: self.primary
				}],
				editionStatusId: parseInt(self.editionStatusId),
				languageId: parseInt(self.languageId),
				beginDate: self.beginDate,
				endDate: self.endDate,
				ended: self.ended,
				disambiguation: self.disambiguation,
				annotation: self.annotation,
				note: self.revisionNote
			})
			.promise()
			.then(function(revision) {
				// XXX: Eww, eww, eww
				if (!revision.body || !revision.body.entity) {
					window.location.replace('/login');
					return;
				}

				console.log(revision.body.entity.entity_gid);
				window.location.href = '/edition/' + revision.body.entity.entity_gid;
			})
			.catch(function(err) {
				self.error(err);
			});
	};

	self.page = ko.observable(1);

	self.newName = '';
	self.newSortName = '';
	self.aliasLanguageId = '';
	self.primary = false;

	self.languageId = null;

	self.error = ko.observable();

	self.editionStatusId = null;
	self.disambiguation = '';
	self.annotation = '';

	self.beginDate = '';
	self.endDate = '';

	self.revisionNote = '';
	self.ended = ko.observable(false);
}

ko.applyBindings(new CreateEditionViewModel());
