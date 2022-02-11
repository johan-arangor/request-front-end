import React, { useEffect } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";

export default function DeleteModal({
	handleSubmitDelete,
	form,
	changeForm,
	cargoDelete,
    showDelete,
    handleClose,
	cantidadMax,
}) {
	useEffect(() => {
		form.motivoCancelacion = "Motivo de Cancelación";
		form.cancelados = 0;
		form.observacion = "";
	}, [showDelete])

	return (
		<Modal show={showDelete} onHide={handleClose}>
			<Modal.Header>
					<Modal.Title>Cancelar Solicitud {cargoDelete}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmitDelete}>
					<Row>
						<Col>
							<Form.Group controlId="formFile" className="mb-3">
								<Form.Label>Cantidad a cancelar:</Form.Label>
								<Form.Control
									type="number"
									name="cancelados"
									min="1"
									max={cantidadMax}
									onChange={changeForm}
									value={form.cancelados}
									required
								/>
							</Form.Group>
						</Col>
					</Row>					
					<Row>
						<Col>
							<Form.Group controlId="formFile" className="mb-3">
								<Form.Label>Motivo Cancelación</Form.Label>
									<Form.Control
									className="mb-3"
									as="select"
									value={form.motivoCancelacion}
									name="motivoCancelacion"
									onChange={changeForm}
									required
									autoFocus
									>
									<option value="">Motivo de Cancelación</option>
									<option value="Cancela Mision">Cancela Misión</option>
									<option value="Cliente No Requiere">Cliente No Requiere</option>
									<option value="Movimiento Interno">Movimiento Interno</option>
									<option value="Respuesta No Oportuna">Respuesta No Oportuna</option>
									<option value="Contratado Otra Temporal">Contratado Otra Temporal</option>
									<option value="Cancelado Mala Solicitud">Cancelado Mala Solicitud</option>
									<option value="Sobredimencion De Planta">Sobredimención De Planta</option>
									<option value="Cancelacion De Materia Prima">Cancelación de Materia Prima EU</option>
								</Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group controlId="formFile" className="mb-3">
								<Form.Label>Observación</Form.Label>
								<Form.Control
									className="mb-3 "
									name="observacion"
									as="textarea"
									value={form.observacion}
									onChange={changeForm}
									rows={3}
									required
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
					<Col>
						<Button
							size="lg"
							variant="outline-danger btn-block"
							type="submit"
							block
						>
							Cancelar Solicitud
						</Button>
					</Col>
				</Row>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

