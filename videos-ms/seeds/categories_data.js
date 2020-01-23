exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories')
    .del()
    .then(function() {
      let categories = [
        { title: 'Action' },
        { title: 'Adventure' },
        { title: 'Animation' },
        { title: 'Biography' },
        { title: 'Comedy' },
        { title: 'Crime' },
        { title: 'Documentary' },
        { title: 'Drama' },
        { title: 'Family' },
        { title: 'Fantasy' },
        { title: 'Film-Noir' },
        { title: 'Game-Show' },
        { title: 'History' },
        { title: 'Horror' },
        { title: 'Music' },
        { title: 'Musical' },
        { title: 'Mystery' },
        { title: 'News' },
        { title: 'Reality-TV' },
        { title: 'Romance' },
        { title: 'Sci-Fi' },
        { title: 'Sport' },
        { title: 'Talk-Show' },
        { title: 'Thriller' },

      ];
      // Inserts seed entries
      return knex('categories').insert(categories);
    });
};
