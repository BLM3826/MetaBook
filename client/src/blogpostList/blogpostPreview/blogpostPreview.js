/* eslint-disable no-console */
import template from './blogpostPreview.html';
import '../blogList.css';

export class BlogpostPreviewComponent {
  constructor(appService) {
    this.appService = appService;
    this.postTheme = !this.appService.isDark() ? 'my-post' : 'my-post-alt';
    this.heightTheme = !this.appService.isDark() ? 9 : 24;
  }
}
const bindings = {
  post: '<',
  user: '<',
};

BlogpostPreviewComponent.$inject = ['appService'];

export default { controller: BlogpostPreviewComponent, template, bindings };
