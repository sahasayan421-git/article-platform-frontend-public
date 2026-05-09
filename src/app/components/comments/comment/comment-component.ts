import {
  ChangeDetectorRef,
  Component,
  HostListener,
  ElementRef,
  Input
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

import { CommentService } from '../../../services/comment-service';
import { AuthService } from '../../../services/auth-service';
import { UserService } from '../../../services/user-service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Comment } from '../../../models/comment';
import { User } from '../../../models/user';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './comment-component.html',
  styleUrls: ['./comment-component.css']
})
export class CommentComponent {

  @Input() articleId!: string;

  commentText = '';

  comments: Comment[] = [];

  // Reply state
  replyingTo: string | null = null;

  replyText = '';

  // Collapse state
  collapsedReplies: { [key: string]: boolean } = {};

  // Mention dropdown
  mentionUsers: User[] = [];

  showMentionDropdown = false;

  mentionQuery = '';

  activeMentionType: 'comment' | 'reply' | null = null;

  // Debounce
  mentionSearch$ = new Subject<string>();

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    public auth: AuthService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {

    if (this.articleId) {
      this.loadComments();
    }

    // Mention search debounce
    this.mentionSearch$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(query => {

        if (!query.trim()) {

          this.mentionUsers = [];

          this.showMentionDropdown = false;

          return;
        }

        this.userService.searchUsers(query)
          .subscribe(res => {

            this.mentionUsers = res;

            this.showMentionDropdown = res.length > 0;

            this.cdr.detectChanges();
          });
      });
  }

  // Load comments
  loadComments() {

    if (!this.articleId) return;

    this.commentService.getComments(this.articleId)
      .subscribe(res => {

        this.comments = res;

        // Default collapse replies
        this.initializeCollapsedReplies(this.comments);

        this.cdr.detectChanges();
      });
  }

  // Default collapse for replies
  initializeCollapsedReplies(comments: any[]) {

    comments.forEach(comment => {

      if (comment.replies?.length > 2) {

        this.collapsedReplies[comment.id] = true;
      }

      if (comment.replies?.length) {

        this.initializeCollapsedReplies(comment.replies);
      }
    });
  }

  // Toggle replies
  toggleReplies(commentId: string) {

    this.collapsedReplies[commentId] =
      !this.collapsedReplies[commentId];
  }

  // Check collapsed
  isCollapsed(commentId: string): boolean {

    return !!this.collapsedReplies[commentId];
  }

  // Post top-level comment
  submit() {

    if (!this.commentText.trim()) return;

    this.commentService
      .addComment(this.articleId, this.commentText)
      .subscribe(() => {

        this.commentText = '';

        this.loadComments();
      });
  }

  // Open reply box
  setReply(comment: Comment) {

    this.replyingTo = comment.id;

    this.replyText = `@${comment.author?.username} `;
  }

  // Cancel reply
  cancelReply() {

    this.replyingTo = null;

    this.replyText = '';

    this.showMentionDropdown = false;
  }

  // Submit reply
  submitReply(parentId: string) {

    if (!this.replyText.trim()) return;

    this.commentService
      .addComment(
        this.articleId,
        this.replyText,
        parentId
      )
      .subscribe(() => {

        this.replyText = '';

        this.replyingTo = null;

        this.showMentionDropdown = false;

        this.loadComments();
      });
  }

  // Detect mention typing
  handleMention(
    event: any,
    type: 'comment' | 'reply'
  ) {

    const value = event.target.value;

    const match = value.match(/@(\w*)$/);

    if (match) {

      this.activeMentionType = type;

      this.mentionQuery = match[1];

      this.mentionSearch$.next(this.mentionQuery);

    } else {

      this.showMentionDropdown = false;
    }
  }

  // Select mention
  selectMention(user: User) {

    const mentionText = `@${user.username} `;

    if (this.activeMentionType === 'comment') {

      this.commentText =
        this.commentText.replace(
          /@\w*$/,
          mentionText
        );

    } else if (
      this.activeMentionType === 'reply'
    ) {

      this.replyText =
        this.replyText.replace(
          /@\w*$/,
          mentionText
        );
    }

    this.showMentionDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {

    const target = event.target as HTMLElement;

    const clickedMentionDropdown =
      target.closest('.mention-dropdown');

    const clickedTextarea =
      target.closest('textarea');

    if (!clickedMentionDropdown && !clickedTextarea) {

      this.showMentionDropdown = false;
      this.activeMentionType = null;

    }
  }
}