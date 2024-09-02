import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {ActivatedRoute, Router} from "@angular/router";
import {MainAPIService} from "../../services/main-api.service";
import {repeat} from "rxjs";

 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {


  private validPassword = 'admin123'; // Defina a senha válida aqui
  public authenticated: boolean = false;
  productForm: FormGroup;


  selectedFile: File | undefined;
  selectedFileUrl: string | ArrayBuffer | null = null;

  uploadDone: boolean = false;
  uploading: boolean = false;


  uploadedImageUrl: any;
  categories = ['Random', 'IA', 'Macacos', 'Gatos', 'Cachorros', 'Animais', 'MaoTsé','Politicos' ];
  
  constructor(private mainAPIService: MainAPIService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {

 

  

    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productImg: [''],
      category: ['']  
    });


    this.route.params.subscribe(params => {
      const password = params['password'];
      if (password == this.validPassword) {
        // Redirecionar se a senha for inválida
        this.authenticated = true;

      }else{

        this.router.navigate(['/home']);
      }
    });
  }



  

  onFileSelected(event: any) {
    const files: FileList = event.target.files;


    if (files.length > 0) {
      this.selectedFile = files[0];

      // Exibir a imagem selecionada
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFileUrl = reader.result;

      };
      reader.readAsDataURL(this.selectedFile);

      this.uploadFile()
    } else {

      this.selectedFile = undefined;
      this.selectedFileUrl = null;
    }
  }

   uploadFile() {
   if (this.selectedFile) {
     this.uploading = true;
   this.mainAPIService.uploadImage(this.selectedFile).subscribe(
   response => {
   console.log('File uploaded successfully', response);
   this.uploadedImageUrl = response; // Armazenar a URL da imagem
     this.productForm.patchValue({
       productImg: response
     });


   this.uploadDone = true;
   this.uploading = false;
   },
   error => {
   console.error('Error uploading file', error);
   }
   );
   }
   }




  productStatus: any;

  onSubmit(): void {
    if (this.productForm.valid) {
 
     this.mainAPIService.addProduto(this.productForm.value).subscribe(
        response => {
          console.log('Product created successfully', response);
          this.productStatus = response 
        },
        error => {
          console.log("Json enviado foi -> " + this.JSON.stringify(this.productForm.value))
          console.error('Error creating product', error);
          this.productStatus = error 
        }
      );


    } else {
      console.error('Formulário inválido');
    }
  }


  protected readonly JSON = JSON;
}
