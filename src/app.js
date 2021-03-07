;(function(){
    
    var AppHead = {
        props: ['logo'],
        template: '<img :src="logo">'
    }

    var FilmItem = {
        props: {
            'filmInfo' : {
                type: Object,
                default: function() {
                    return {}
                }
            }
        },
        data: function() {
            var description = this.filmInfo.description.substring(0, 300);
            return {
                title: this.filmInfo.original_title,
                content: `${description}...`
            }
        },
        template: `
            <div class="card">
                <h1>{{title}}</h1>
                <p>{{content}}</p>
            </div>
        `
    }

    var vm = new Vue({
        el: '#app',
        components: {
            AppHead,
            FilmItem
        },
        data: {
            logo: './public/logo.png',
            films: []
        },
        methods: {
            
        },
        created: function() {
            var vm = this;
            axios.get('https://ghibliapi.herokuapp.com/films')
            .then(function (response) {
                var dataArr = response.data;
                dataArr.forEach((item) => {
                    vm.films.push(item);
                });
            })
            .catch(function (error) {
            alert(error);
            })
        }
    })

})()