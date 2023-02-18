import React from 'react';
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

export default function TracksHeader() {
   const matches = useMediaQuery('(max-width: 572px)');

   return !matches && (
      <div className="tracks-box__head main-desc flex j-sb">
         <p className="tracks-box__head__cell">#</p>
         <p className="tracks-box__head__cell">Название</p>
         <p className="tracks-box__head__cell">Исполнитель</p>
         <div className="tracks-box__head__cell"/>
      </div>
   )
};