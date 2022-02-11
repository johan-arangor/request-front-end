import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { FcNext, FcPrevious } from "react-icons/fc";
import ObservacionesModal from "./ObservacionModal";

export default function Observaciones({
  ShowObservation,
  addObservaciones,
  seguimientos,
  form,
  handleClose,
  handleChange,
  observaciones,
  tokenRol
}) {
	const [observacionesAll, setObservacionesAll] = useState([]);
	const [usuario, setUsuario] = useState([]);
	const [count, setCount] = useState(0);
	const [total, setTotal] = useState(0);

  useEffect(() => {
    if (observaciones != "") {
      let observacionTemp = observaciones[0].List;
			setTotal(observacionTemp.length);

      setObservacionesAll(observacionTemp[count].Observacion);
	  setUsuario(observacionTemp[count].Usuario);
    }
  }, [seguimientos, observaciones, usuario, count]);

  return (
		<>
			<div className="row">
				<h3 className="col-md-12 text-center">
					Observaciones {total > 0 ? count + 1 : 0} / {total}
				</h3>
			</div>
				{observacionesAll &&
					(
						observacionesAll.length === 0 ? (
							<div className="row">
								<h3 className="col-md-12 text-center">
									Sin Observaciones
								</h3>
							</div>
						) : (
							<div className="row">
								<div className="col-md-1" text>
									<Button
										variant="outline-primary"
										onClick={() => setCount(count > 0 ? count - 1 : 0)}
									>
										<FcPrevious />
									</Button>
								</div>
								<div className="col-md-10">
									<Form.Group controlId="formFile" className="mb-3">
										{tokenRol === "true" && (
											<Form.Label>Usuario: {usuario}</Form.Label>
										)}
										<Form.Control
											className="mb-3 "
											name="observacion"
											as="textarea"
											value={observacionesAll}
											rows={3}
											locked
										/>
									</Form.Group>
								</div>
								<div className="col-md-1 justify-content-end">
									<Button
										className="float-right"
										variant="outline-primary"
										onClick={() => setCount(count + 1 < total ? count + 1 : total - 1)}
									>
										<FcNext />
									</Button>
								</div>
							</div>
						)
					)}
				<ObservacionesModal
					ShowObservation={ShowObservation}
					addObservaciones={addObservaciones}
					form={form}
					handleClose={handleClose}
					handleChange={handleChange} 
				/>
			</>
  );
}
