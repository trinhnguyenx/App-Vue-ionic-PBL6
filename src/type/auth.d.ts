export interface IUser {
    id: number;
    username: string;
    fullname: string;
    email: string;
    password: string;
    role: string;
    avatar: string;
    age: number;
    is_verified: boolean;
    is_bhyt: boolean;
    is_gplx: boolean;
    accessToken: string;
}

// <template>
//   <ion-page>
//     <ion-content>
//       <ion-grid>
//         <div v-if="showForm" class="form-data">
//           <ion-card>
//             <ion-card-header>
//               <ion-card-title>Thông tin CCCD</ion-card-title>
//             </ion-card-header>
//             <ion-card-content>
//               <ion-list>
//                 <ion-item>
//                   <ion-label>Họ và Tên:</ion-label>
//                   <ion-text>{{ listData?.name }}</ion-text>
//                 </ion-item>
//                 <ion-item>
//                   <ion-label>Card Number:</ion-label>
//                   <ion-text>{{ listData?.id }}</ion-text>
//                 </ion-item>
//                 <ion-item>
//                   <ion-label>Ngày Sinh:</ion-label>
//                   <ion-text>{{ listData?.dob }}</ion-text>
//                 </ion-item>
//                 <ion-item>
//                   <ion-label>Quốc Tịch:</ion-label>
//                   <ion-text>{{ listData?.nationality }}</ion-text>
//                 </ion-item>
//                 <ion-item>
//                   <ion-label>Loại GPLX:</ion-label>
//                   <ion-text>{{ listData?.type }}</ion-text>
//                 </ion-item>
//                 <ion-item>
//                   <ion-label>Cấp bởi:</ion-label>
//                   <ion-text>{{ listData?.origin_place }}</ion-text>
//                 </ion-item>
//                 <ion-item>
//                   <ion-label>Gender:</ion-label>
//                   <ion-text>{{ listData?.current_place }}</ion-text>
//                 </ion-item>
//                 <ion-item>
//                   <ion-label>Hạn:</ion-label>
//                   <ion-text>{{ listData?.expire_date }}</ion-text>
//                 </ion-item>
//                 <ion-item>
//                   <ion-label>Gender:</ion-label>
//                   <ion-text>{{ listData?.gender }}</ion-text>
//                 </ion-item>
//               </ion-list>
//               <ion-button expand="block" color="primary" @click="closeForm">
//                 Đóng
//               </ion-button>
//             </ion-card-content>
//           </ion-card>
//         </div>
//       </ion-grid>
//       <ion-fab slot="fixed" vertical="bottom" horizontal="end">
//         <ion-fab-button @click="takePhoto()">
//           <ion-icon :icon="imageOutline"></ion-icon>
//         </ion-fab-button>
//       </ion-fab>
//     </ion-content>
//   </ion-page>
// </template>