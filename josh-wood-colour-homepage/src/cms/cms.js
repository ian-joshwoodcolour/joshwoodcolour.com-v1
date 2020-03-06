import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import ProductTeaserPreview from './preview-templates/ProductTeaserPreview'
import BannerItemPreview from './preview-templates/BannerItemPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('product-teaser', ProductTeaserPreview)
CMS.registerPreviewTemplate('banner-item', BannerItemPreview)
