import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AcademyService } from 'src/app/services/academy.service';
import { ActivatedRoute } from '@angular/router';
import {
  faBook,
  faChessBishop,
  faLocationArrow,
  faChessKnight,
  faEnvelope,
  faLock,
  faExclamationTriangle,
  faUser,
  faMobile,
  faImage,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-institute',
  templateUrl: './edit-institute.component.html',
  styleUrls: ['./edit-institute.component.css']
})
export class EditInstituteComponent implements OnInit {
  updateAcademyForm: FormGroup;
  faChessKnight = faChessKnight;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faTriangleExclamation = faExclamationTriangle;
  faUser = faUser;
  faMobile = faMobile;
  faImage = faImage;
  faLocation = faLocationArrow;
  faChessBishop = faChessBishop;
  faBook = faBook;
  constructor(
    private router: Router,
    private academy: AcademyService,
    private toaster: ToastrService,
    private activeRouter: ActivatedRoute
  ) {}
  ngOnInit() {
    this.updateAcademyForm = new FormGroup({
      instituteId: new FormControl(),
      instituteName: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      instituteAddress: new FormControl(null, [Validators.required]),
      instituteDescription: new FormControl(null, [Validators.required]),
      rating: new FormControl(),
      userGiveRating: new FormControl(),
      averageRating: new FormControl(),
    });
    console.log(this.activeRouter.snapshot.params['id']);
    this.academy
      .getAcademyById(this.activeRouter.snapshot.params['id'])
      .subscribe((res) => {
        this.updateAcademyForm
          .get('instituteId')
          .setValue(this.activeRouter.snapshot.params['id']);
        this.updateAcademyForm.get('instituteName').setValue(res.instituteName);
        this.updateAcademyForm.get('mobile').setValue(res.mobile);
        this.updateAcademyForm.get('image').setValue(res.image);
        this.updateAcademyForm.get('email').setValue(res.email);
        this.updateAcademyForm.get('instituteAddress').setValue(res.instituteAddress);
        this.updateAcademyForm.get('instituteDescription').setValue(res.instituteDescription);
        this.updateAcademyForm.get('rating').setValue(res.rating);
        this.updateAcademyForm.get('userGiveRating ').setValue(res.userGiveRating );
        this.updateAcademyForm.get('averageRating ').setValue(res.averageRating );
      });
  }
  onUpdateAcademy() {
    if (this.updateAcademyForm.valid) {
      this.academy
        .updateAcademy(
          this.activeRouter.snapshot.params['id'],
          this.updateAcademyForm.value
        )
        .subscribe((res) => {
          this.router.navigate(['/admin/viewInstitutes']);
          this.toaster.success('Successfully', 'Updated Successfully', {
            timeOut: 2000,
          });
        });
    } else {
      this.toaster.error('Error', 'Something went wrong', { timeOut: 2000 });
    }
  }
}
