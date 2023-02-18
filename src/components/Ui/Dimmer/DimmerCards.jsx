import React from 'react';
import {Link} from "react-router-dom";

import Skeleton from "@material-ui/lab/Skeleton";
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

import {audioImageNotFound} from "../../../assets/img";

function IsLink({matches, children, to, classes}) {
   return matches ? (
      <div>
         {children}
      </div>
   ) : (
      <Link className={classes} to={to}>
         {children}
      </Link>
   )
}

const DimmerCards = ({customClass, customArr, loading, url, imgUrl, isArtist}) => {
   const matches = useMediaQuery('(max-width: 572px)');
   let height;

   if (matches) {
      height = isArtist ? 180 : 310
   } else {
      height = ''
   }

   return (
      (loading || customArr.length === 0 ? Array.from(new Array(8)) : customArr).map((item, index) => (
         <li className={customClass.item} key={index}>
            {item ? (
               <IsLink classes={customClass.link} to={isArtist ? url + item.id : url + item.slug} matches={matches}>
                  <div className={customClass.box}>
                     <div className={customClass.imgBox}>
                        <img
                           src={item.picture ? `${imgUrl}/${item.picture}` : audioImageNotFound}
                           alt={item.name}
                        />
                     </div>
                     <div className={`${customClass.body} ${matches && 'flex j-sb flex-align-center'}`}>
                        <div>
                           <h3 className={customClass.title}>{item.name}</h3>
                           <p>Треки: {item.tracks.length}</p>
                        </div>
                        {matches && (
                           <Link to={isArtist ? url + item.id : url + item.slug}>
                              <IconButton aria-label="link">
                                 <NavigateNextIcon/>
                              </IconButton>
                           </Link>
                        )}
                     </div>
                  </div>
               </IsLink>
            ) : (
               <div className={customClass.box}>
                  <div className={customClass.imgBox}>
                     <Skeleton className="skeleton-img" variant="rect" height={height}/>
                  </div>
                  <div className={customClass.body}>
                     <Skeleton width="60%"/>
                     <Skeleton width="20%"/>
                  </div>
               </div>
            )}
         </li>
      ))
   );
};

export default DimmerCards;
