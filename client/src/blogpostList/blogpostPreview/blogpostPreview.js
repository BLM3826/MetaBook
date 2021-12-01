/* eslint-disable no-console */
import template from './blogpostPreview.html';
import '../blogList.css';

export class BlogpostPreviewComponent {}
const bindings = {
  post: '<',
  user: '<',
};

BlogpostPreviewComponent.$inject = ['$log'];

export default { controller: BlogpostPreviewComponent, template, bindings };
