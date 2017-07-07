$(document).ready(() =>
    {
    console.log("MY BODY IS READY!");
    $('.ui.dropdown') .dropdown();

    $('#my-select').multiSelect();

      $('.ui.search').search({
      source: subreddits
    });

          var IGNOREME = [
        { title: '/r/realifedoodles' },
        { title: 'banana' },
        { title: 'Afghanistan' },
        { title: 'Gucci' },
        { title: 'Bob Ross' },
        { title: 'Doge' },
        { title: '42' }
        // etc
      ];
    }
  );