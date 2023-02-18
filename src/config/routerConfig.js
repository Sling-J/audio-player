import React from "react";
import Auth from "../components/Auth/Auth";
import HomePage from "../components/Home/Home";
import GenresPage from "../components/Genres/Genres";
import SingersPage from "../components/Singers/Singers";
import ItemTracksPage from "../components/ItemTracks/ItemTracks";
import SingersDetailPage from "../components/Singers/SingersDetail";
import GenresDetailPage from "../components/Genres/GenresDetail";

import HomeIcon from '@material-ui/icons/Home';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

import {urls} from "./utils";

export const routes = [
   {path: urls.user.path, component: Auth},
   {path: urls.home.path, component: HomePage},
   {path: urls.genres.path, component: GenresPage},
   {path: urls.artists.path, component: SingersPage},
   {path: urls.allTracks.path, render: () => <ItemTracksPage item={urls.allTracks}/>},
   {path: urls.newTracks.path, render: () => <ItemTracksPage item={urls.newTracks}/>},
   {path: urls.bestTracks.path, render: () => <ItemTracksPage item={urls.bestTracks}/>},
   {path: urls.popularTracks.path, render: () => <ItemTracksPage item={urls.popularTracks}/>},
   {path: urls.artistsDetail.path, render: ({match}) => <SingersDetailPage id={match.params.id - 1}/>},
   {path: urls.genresDetail.path, render: ({match}) => <GenresDetailPage slug={match.params.slug}/>}
];

export const profileNavItems = [
   {path: urls.savedTracks.path, tabName: 'Моя музыка'},
];

export const homeNavItems = [
   {path: urls.home.path, tabName: urls.home.name, icon: <HomeIcon/>},
   {path: urls.allTracks.path, tabName: urls.allTracks.name, icon: <LibraryMusicIcon/>},
   {path: urls.genres.path, tabName: urls.genres.name, icon: <FormatListNumberedRtlIcon/>},
   {path: urls.artists.path, tabName: urls.artists.name, icon: <QueueMusicIcon/>},
   {path: urls.newTracks.path, tabName: urls.newTracks.name, icon: ''},
   {path: urls.bestTracks.path, tabName: urls.bestTracks.name, icon: ''},
   {path: urls.popularTracks.path, tabName: urls.popularTracks.name, icon: ''},
];
