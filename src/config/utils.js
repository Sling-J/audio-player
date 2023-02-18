export const urls = {
   user: {path: '/user', name: 'Пользователь'},
   login: {path: '/user/login', name: 'Авторизация'},
   signUp: {path: '/user/sign-up', name: 'Регистрация'},
   home: {path: '/home', name: 'Всё'},
   allTracks: {path: '/tracks', name: 'Треки'},
   artists: {path: '/artists', name: 'Исполнители'},
   artistsDetail: {path: '/artists/:id', name: ''},
   genres: {path: '/genres', name: 'Жанры'},
   genresDetail: {path: '/genres/:slug', name: ''},
   savedTracks: {path: '/profile/tracks', name: 'Моя музыка'},
   newTracks: {path: '/new-tracks', name: 'Новинки'},
   bestTracks: {path: '/best-tracks', name: 'Лучшее'},
   popularTracks: {path: '/popular-tracks', name: 'Популярное'}
};

export function fetchRequest(url, requestType, successType, errorType) {
   const request = () => ({type: requestType});
   const success = tracks => ({type: successType, payload: tracks});
   const failure = error => ({type: errorType, error});

   return dispatch => {
      dispatch(request());
      url()
         .then(res => {
            if (res.status === 200) {
               dispatch(success(res.data));
            } else {
               dispatch(failure(res));
            }
         })
         .catch(err => dispatch(failure(err)))
   };
}
