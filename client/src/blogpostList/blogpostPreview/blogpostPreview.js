/* eslint-disable no-console */
import template from './blogpostPreview.html';
import '../blogList.css';

export class BlogpostPreviewComponent {
  constructor() {
    this.postTheme = sessionStorage.getItem('theme') === 'default' ? 'my-post' : 'my-post-alt';
  }
}
const bindings = {
  post: '<',
  user: '<',
};

BlogpostPreviewComponent.$inject = ['$log'];

export default { controller: BlogpostPreviewComponent, template, bindings };
