import axios from 'axios';

const instance = axios.create({
   headers: {
      'Content-Type': 'application/json',
   }
});

instance.defaults.timeout = 10000;

export const TestAuth = userData => {
	return new Promise ((resolve, reject) => {
      setTimeout(() => {
         if (userData.username === '87757989824' && userData.password === '1234') {
            resolve({
               status: 200,
               data: {
                  status: 'SUCCESS',
                  token: 'asd.TEST.TOKEN.asd',
						refreshToken: 'asd.TEST.REFRESH.asd',
						userData: {test: 'test', test2: 'test2'}
               }
            });
         } else {
            reject({
               status: 401,
               statusText: 'Unauthorized'
            });
         }
      }, 200)
   })
}

export const TestCheckAuth = token => {
   return new Promise ((resolve, reject) => {
      setTimeout(() => {
         if (token) {
            resolve({
               status: 200,
               data: {
                  status: 'SUCCESS',
                  token: 'asd.TEST.TOKEN.asd',
                  refreshToken: 'asd.TEST.REFRESH.asd',
               }
            });
         } else {
            reject({
               status: 401,
               statusText: 'Unauthorized'
            });
         }
      }, 200)
   })
};

export const Auth = {
   login: dataOfForm => instance.post('https://nurel-auth-api.herokuapp.com/api/auth/', dataOfForm),
   checkAuth: accessToken => instance.post('', accessToken),
   refreshUser: refreshToken => instance.post('', refreshToken),
};

export const Player = {
   fetchSongs: () => instance.get('/tracks-data/tracks/tracks.json'),
   fetchBestTracks: () => instance.get('/tracks-data/tracks/best-tracks.json'),
   fetchNewTracks: () => instance.get('/tracks-data/tracks/new-tracks.json'),
   fetchPopularTracks: () => instance.get('/tracks-data/tracks/popular-tracks.json'),
   fetchGenres: () => instance.get('/tracks-data/tracks/genres.json'),
   fetchSingers: () => instance.get('/tracks-data/tracks/singers.json'),
};
