import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ConversationCreate } from 'src/core/interface/conversation.interface';
import { ProfileUserResponse } from 'src/core/interface/profileUser.interface';
import { authService } from 'src/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: false,
})
export class ProfileComponent implements OnInit {
  private destroy$ = new Subject<void>();
  loadingProfile: boolean = false;
  userInfo: ProfileUserResponse | null = null;
  userId = Number(localStorage.getItem('userId'));
  idUser = 0;
  followed: boolean = false;
  constructor(
    private authService: authService,
    private route: ActivatedRoute,
    private navigate: Router
  ) {
    this.idUser = Number(this.route.snapshot.paramMap.get('userId') || '');
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    const dataBody = {
      userId: Number(this.idUser),
    };
    this.loadingProfile = true;
    this.authService
      .profileUser(dataBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          this.userInfo = results; // <-- Asigna el objeto completo aquí
          if (this.idUser !== this.userId) {
            this.seeFollowUsers();
          }
        },
        complete: () => {
          this.loadingProfile = false;
        },
        error: (err) => {
          this.loadingProfile = false;
          console.error('Error al buscar:', err);
        },
      });
  }

  followUser(id: number) {
    const dataBody = {
      followed_id: id,
    };
    this.authService.followUser(dataBody).subscribe({
      next: (response) => {
        this.seeFollowUsers();

        // Aquí puedes manejar la respuesta después de seguir al usuario
      },
      error: (error) => {
        console.error('Error al seguir al usuario:', error);
      },
    });
  }

  unfollowUser(id: number) {
    const dataBody = {
      followed_id: id,
    };
    this.authService.unfollowUser(dataBody).subscribe({
      next: (response) => {
        this.seeFollowUsers();
        // Aquí puedes manejar la respuesta después de dejar de seguir al usuario
      },
      error: (error) => {
        console.error('Error al dejar de seguir al usuario:', error);
      },
    });
  }

  seeFollowUsers() {
    this.authService.isFollowUser(this.idUser).subscribe({
      next: (response) => {
        this.followed = response.isFollowing;
        // Aquí puedes manejar la respuesta después de obtener los usuarios seguidos
      },
      error: (error) => {
        console.error('Error al obtener los usuarios seguidos:', error);
      },
    });
  }

  createConversation() {
    const dataBody: ConversationCreate = {
      userIds: [this.idUser, this.userId],
      isGroup: false,
    };
    this.authService.createConversation(dataBody).subscribe({
      next: (response) => {
        console.log('Conversación creada:', response);
        if (response.created) {
          this.navigate.navigate(['home/chat/' + response.conversationId]);
        } else if (response.existed) {
          this.navigate.navigate(['home/chat/', response.conversationId]);
        }
      },
      error: (error) => {
        console.error('Error al crear la conversación:', error);
      },
    });
  }

  backSteep() {
    this.navigate.navigate(['/home/system/message']);
  }
}
