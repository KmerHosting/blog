'use client';

import { Column, Grid, Loading, SkeletonPlaceholder, SkeletonText, Tile } from '@carbon/react';

export default function LoadingPage() {
  return <div className="blog-loading-stage" aria-live="polite" aria-busy="true">
    <div className="blog-loading-surface" aria-hidden="true">
      <Grid fullWidth className="blog-loading-grid">
        <Column sm={4} md={6} lg={10}>
          <SkeletonText heading width="70%" />
          <SkeletonText paragraph lineCount={3} width="82%" />
        </Column>
        <Column sm={4} md={2} lg={6}>
          <SkeletonPlaceholder className="blog-loading-feature" />
        </Column>
        {[0, 1, 2].map((item) => <Column sm={4} md={4} lg={item === 0 ? 8 : 4} key={item}>
          <Tile className="blog-loading-tile">
            <SkeletonText width="35%" />
            <SkeletonText heading width="78%" />
            <SkeletonText paragraph lineCount={2} width="100%" />
          </Tile>
        </Column>)}
      </Grid>
    </div>
    <Loading active withOverlay description="Loading KmerHosting Blog" />
  </div>;
}
