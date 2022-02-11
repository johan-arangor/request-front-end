import React, { useState } from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import DownloadRangesModal from "../../Modals/DownloadRangesModal"
import { BsPersonSquare, BsPeopleFill, BsPinMapFill, BsJournalBookmarkFill, BsFillCalendar3WeekFill, BsFillCloudDownloadFill  } from "react-icons/bs";

export default function Admin() {
  const [modalShow,setModalShow]=useState(false)

  const hideModal=()=>{
    setModalShow(false)
  }
  const showModal=()=>{
    setModalShow(true)
  }

  return (
    <>
      <Container fluid>
        <Card>
          <Card.Header>
            <h1>Zona administrativa</h1>
          </Card.Header>
          <Card.Body>
            <Container>
              <Row className="justify-content-md-around mt-2">
                <Col>
                  <Card 
                    style={{ width: '18rem', height: '12rem', padding: '5px' }} 
                    className="text-center"
                    onClick={() => {
                      window.location.href = "/Users";
                    }}
                    >
                    <Card.Title>
                      <BsPersonSquare size={70} color="blue" />
                    </Card.Title>
                    <Card.Body>
                      <h3 class="text-primary">Administrar Usuarios</h3>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card 
                    style={{ width: '18rem', height: '12rem', padding: '5px' }}
                    className="text-center"
                    onClick={() => {
                      window.location.href = "/Clientes";
                    }}
                    >
                    <Card.Title>
                      <BsPeopleFill size={70} color="blue" />
                    </Card.Title>
                    <Card.Body>
                      <h3 class="text-primary">Administrar Clientes</h3>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card 
                    style={{ width: '18rem', height: '12rem', padding: '5px' }} 
                    className="text-center"
                    onClick={() => {
                      window.location.href = "/Ans";
                    }}
                    >
                    <Card.Title>
                      <BsJournalBookmarkFill size={70} color="blue" />
                    </Card.Title>
                    <Card.Body>
                      <h3 class="text-primary">Administrar ANS</h3>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="justify-content-end mt-2">
                <Col>
                  <Card 
                    style={{ width: '18rem', height: '12rem', padding: '5px' }} 
                    className="text-center"
                    onClick={() => {
                      window.location.href = "/fecha";
                    }}
                    >
                    <Card.Title>
                      <BsFillCalendar3WeekFill size={70} color="blue" />
                    </Card.Title>
                    <Card.Body>
                      <h3 class="text-primary">Administrar Fechas</h3>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card 
                    style={{ width: '18rem', height: '12rem', padding: '5px' }}
                    className="text-center"
                    onClick={() => {
                      window.location.href = "/campus";
                    }}
                    >
                    <Card.Title>
                      <BsPinMapFill size={70} color="blue" />
                    </Card.Title>
                    <Card.Body>
                      <h3 class="text-primary">Administrar Sedes</h3>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card 
                    style={{ width: '18rem', height: '12rem', padding: '5px' }}
                    className="text-center"
                    onClick={showModal}
                    >
                    <Card.Title>
                      <BsFillCloudDownloadFill size={70} color="blue" />
                    </Card.Title>
                    <Card.Body>
                      <h3 class="text-primary">Decargar por Rango</h3>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              </Container>
            </Card.Body>
        </Card>
        <DownloadRangesModal modalShow={modalShow} changeModalShow={hideModal}/>
      </Container>
    </>
  );
}
