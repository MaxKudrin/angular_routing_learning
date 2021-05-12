import { Post, PostsService } from './../posts.service';
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post
  constructor(private route: ActivatedRoute, private postService: PostsService, private router: Router) { }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.post = this.postService.getById(+params.id)
    })
  }
  loadPostFour() {
    this.router.navigate(['/posts', '44'])
  }
}
