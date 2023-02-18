import React from 'react';

import {Pagination} from "semantic-ui-react";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

const TracksPagination = ({paginationVisible, totalPages, paginate}) => {
   const matches = useMediaQuery('(max-width: 572px)');

   return paginationVisible ? (
      <div className="tracks-box__pagination">
         <Pagination
            onPageChange={(e, {activePage}) => paginate(activePage)}
            totalPages={totalPages}
            defaultActivePage={1}
            firstItem={null}
            lastItem={null}
            pointing={matches}
            secondary={matches}
         />
      </div>
   ) : null;
};

export default TracksPagination;
