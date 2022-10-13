import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import {
  verEmpleos, actualizarEmpleos
} from '../src/api/Empleos.js'
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
const Empleos = () => {
  const [Data, setData] = useState([])
  const [empleoDialog1, setempleoDialog1] = useState(false);

  const [deleteProductsDialog, setdeleteProductsDialog] = useState(false)

  const toast = useRef();
  useEffect(() => {

    peticionGet();
  }, []);

  const peticionGet = async () => {
    verEmpleos().then(response => {
      console.log(response.data)
      setData(response.data)
    })

  }

  let emptyProduct = {
    idempleo: null,
    nombre: null,
    estado: 0,
    pefil: null
  };

  const [product, setProduct] = useState(emptyProduct);

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mr-2" onClick={() => Cambiarestado(rowData)} />
      </div>
    );
  }

  const Cambiarestado = (product) => {
    setdeleteProductsDialog(true)
    setProduct(product)
  }


  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };
    _product[`${name}`] = val;
    setProduct(_product);
  }
  const hideDialog = () => {
    //   setSubmitted(false);
    setempleoDialog1(false);
  }

  const editProduct = (product) => {

    console.log(product);
    setProduct({ ...product });
    setempleoDialog1(true);
  }

  const actualizarEmpleo = () => {


    console.log(product.idempleo);
    console.log(product.nombre);

    actualizarEmpleos(product.idempleo, product.nombre, product.estado, product.pefil).then(response => {
      console.log(response.msj)
      if (response.msj === true) {
        toast.current.show({ severity: 'success', summary: 'Error Message', detail: 'Registro exitoso', life: 3000 });
        peticionGet();
      } else {

        toast.current.show({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(response.error), life: 3000 });

      }
    })
  }


  const deletePreguntaDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"

      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => Cambiarestado1()}
      />
    </>
  )


  const hideDeleteProductsDialog = () => {
    //setDeleteProductsDialog(false);
    // setdeleteProductsDialog(false);
    setdeleteProductsDialog(false)
  }


  const Cambiarestado1 = () => {
    console.log(product.estado);

    if (product.estado === 0) {
      actualizarEmpleos(product.idempleo, product.nombre, '1', product.pefil).then(response => {
        console.log(response.msj)
        if (response.msj === true) {
          toast.current.show({ severity: 'success', summary: 'Error Message', detail: 'eliminado', life: 3000 });
          peticionGet();
        } else {

          toast.current.show({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(response.error), life: 3000 });

        }
      })



    } else if ((product.estado === 1)) {

      actualizarEmpleos(product.idempleo, product.nombre, '0', product.pefil).then(response => {
        console.log(response.msj)
        if (response.msj === true) {
          toast.current.show({ severity: 'success', summary: 'Error Message', detail: 'eliminado', life: 3000 });
          peticionGet();
        } else {

          toast.current.show({ severity: 'error', summary: 'Error Message', detail: JSON.stringify(response.error), life: 3000 });

        }
      })
    }



  }




  return (
    <div className="App">

      <div className="card">
        <Toast ref={toast} />
        <DataTable value={Data}
          dataKey="idpostulaciones" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          responsiveLayout="scroll">

          <Column field="idempleo" header="id" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="nombre" header="Puesto" sortable style={{ minWidth: '16rem' }}></Column>
          <Column field="pefil" header="Empresa" sortable style={{ minWidth: '10rem' }}></Column>
          <Column field="estado" header="Estado Empleo" sortable style={{ minWidth: '10rem' }}></Column>
          <Column body={actionBodyTemplate}></Column>



        </DataTable>

        <Dialog visible={empleoDialog1} style={{ width: '450px' }} header="Editar datos del empleo" modal className="p-fluid" onHide={hideDialog}>
          <div className="field">
            <label htmlFor="description">Nombre</label>
            <InputText id="description" value={product.nombre} onChange={(e) => onInputChange(e, 'nombre')} required />

          </div>
          <div className="field">
            <label htmlFor="description">Perfil</label>

            <InputTextarea id="textarea" value={product.pefil} onChange={(e) => onInputChange(e, 'pefil')} required rows={3} />

          </div>


          <Button label="Actualizar" icon="pi pi-check" className="p-button-text" onClick={actualizarEmpleo} />
        </Dialog>


        <Dialog
          visible={deleteProductsDialog}
          style={{ width: '450px' }}
          header="Confirm"
          footer={deletePreguntaDialogFooter}
          modal
          onHide={hideDeleteProductsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: '2rem' }}
            />
            ¿Esta Seguro que quiera desactivar empleo?
          </div>
        </Dialog>


      </div>

    </div>
  );
}

export default Empleos;
