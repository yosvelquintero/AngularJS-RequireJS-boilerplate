define(['./module'], function (services) {
  'use strict';

  services.factory('PersonService', [
    '$log',
    '$http',
    '$state',
    'Slug',
    function ($log, $http, $state, Slug) {
      return {
        getAll: getAll,
        getById: getById,
        save: save,
        generateDemoData: generateDemoData,
        destroy: destroy,
      };

      /**
       * Get all
       * @return {Array} Array of persons sorted by id desc
       */
      function getAll() {
        return _getPersons().sort(function (a, b) {
          return b.id - a.id;
        });
      }

      /**
       * Get by id
       * @param  {Int} id Person id
       * @return {Object}    Person
       */
      function getById(id) {
        return _getPersons().find(function (person) {
          return person.id === +id;
        });
      }

      /**
       * Save
       * @param  {Object} person Person to create/update
       * @return {Void}         Create/Update
       */
      function save(person) {
        return person.id ? _update(person) : _create(person);
      }

      /**
       * Generate persons demo data
       * @returns {Void} Redirection to "persons.list" state
       */
      function generateDemoData() {
        return $http
          .get('persons.json')
          .then(function (response) {
            const persons = _mapPersons(response.data);
            localStorage.removeItem('persons');
            _savePersons(persons);
            $state.go('persons.list');
          })
          .catch(function (error) {
            $log.error(error);
          });
      }

      /**
       * Destroy
       * @param  {Int} id Person id
       * @return {Void}          Set person
       */
      function destroy(id) {
        const persons = _getPersons();
        const index = persons.findIndex(function (person) {
          return person.id === id;
        });

        persons.splice(index, 1);
        return _setPersons(persons);
      }

      /**
       * Get persons
       * @return {Array} Array of persons objects
       */
      function _getPersons() {
        if (!localStorage.getItem('persons')) {
          localStorage.setItem('persons', JSON.stringify([]));
        }

        return JSON.parse(localStorage.getItem('persons'));
      }

      /**
       * Set persons
       * @param {Array} persons Persons array
       */
      function _setPersons(persons) {
        localStorage.setItem('persons', JSON.stringify(persons));
      }

      /**
       * Create
       * @param  {Object} person Person object
       * @return {Void}          Set person
       */
      function _create(person) {
        const persons = _getPersons();
        const lastPerson = persons[persons.length - 1] || {
          id: 0,
        };
        person.id = lastPerson.id + 1;
        person.slug = Slug.slugify(person.name);

        persons.push(person);
        return _setPersons(persons);
      }

      /**
       * Update
       * @param  {Object} person Person object
       * @return {Void}          Set person
       */
      function _update(person) {
        const persons = _getPersons();
        for (const i = 0, len = persons.length; i < len; i++) {
          if (persons[i].id === person.id) {
            person.slug = Slug.slugify(person.name);
            persons[i] = person;
            break;
          }
        }
        return _setPersons(persons);
      }

      /**
       * Map persons data to return a new array
       *
       * @param {Array} data Array of persons
       * @returns {Array} Array of persons
       */
      function _mapPersons(data) {
        return data.map(function (p) {
          return {
            name: p.name,
            email: p.email,
            phone: p.phone,
            address: p.address,
            balance: +p.balanceNumber,
            about: p.about,
          };
        });
      }

      /**
       * Save personas
       *
       * @param {Array} persons Array of personas
       */
      function _savePersons(persons) {
        angular.forEach(persons, function (p) {
          _create(p);
        });
      }
    },
  ]);
});
