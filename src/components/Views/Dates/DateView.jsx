import React, { useState, useEffect } from "react";
import moment from "moment";
import Swal from 'sweetalert2'
import Axios from "axios";
import { url } from "../../../global";
import { Button, Card, Container, Form, Col, Row } from "react-bootstrap";


const actualYear = parseInt(moment(Date.now()).format("YYYY"));
const actualMonth = parseInt(moment(Date.now()).format("MM")) - 1;
const monthName = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function DateView() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(actualYear);
  const [selectedMonth, setSelectedMonth] = useState(actualMonth);
  const [days, setDays] = useState([]);
  useEffect(() => {
    setYears([
      actualYear,
      actualYear - 1,
      actualYear - 2,
      actualYear - 3,
      actualYear - 4,
    ]);
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    ) {
      window.location.href = "/";
      return;
    }
  }, []);

  useEffect(() => {
    getDays(selectedYear,selectedMonth)
  }, [selectedYear, selectedMonth]);

  const getDays= async (year, month)=>{
    await Axios.get(url + "/fechas", {
      headers: { "access-token": localStorage.getItem("token") },
      params: {
        year,month
      },
    })
    .then((res) => {
      setDays(res.data)
    })
    .catch((err) => {
      Swal.fire({
        title: "Ocurrió un error",
        icon: "error",
        showConfirmButton: false,
        timer: 5000,
      });
    });
  }

  const getDaysArray = function (year, monthIndex) {
    var names = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];
    var date = new Date(year, monthIndex, 1);
    var result = [];
    while (date.getMonth() == monthIndex) {
      result.push({ number: date.getDate(), date: names[date.getDay()] });
      date.setDate(date.getDate() + 1);
    }
    return result;
  };

  const verifyActualState=(number,activo)=>{
    let listTemp=[...days]
    let actualDay=listTemp.find(el=>el.number==number)
    if(actualDay!=null){
      console.log("2",actualDay)
      actualDay.activo=activo
      console.log("3",actualDay)
      setDays([...listTemp])
    }else return;
  }

  const changeSelectedYear = (e) => {
    setSelectedYear(e.target.value);
  };

  const changeSelectedMonth = (e) => {
    console.log('mes',e.target.value)
    setSelectedMonth(e.target.value);

  };

  const changeDayState =async (e) => {
    console.log('mes select', selectedMonth, 'mes + 1', parseInt(selectedMonth) + 1)
    let day=e.target.getAttribute("index")
    let fecha = moment(actualYear+"-"+(parseInt(selectedMonth) + 1)+"-"+day, "YYYY-MM-DD").toDate();
    let headersForm = {
      headers: { "access-token": localStorage.getItem("token") },
    };
    console.log('fecha',fecha)
    await Axios.put(url + `/fechas`, {fecha}, headersForm)
      .then((res) => {
        console.log("respuesta",res.data);
        verifyActualState(res.data.number,res.data.activo)
      })
      .catch((err) => {
        Swal.fire({
          title: "Ocurrió un error",
          icon: "error",
          showConfirmButton: false,
          timer: 5000,
        });
      });
  };

  return (
    <>
    <Container fluid>
      <Card>
        <Card.Header>
          <h1 className="text-center">Fechas no ANS</h1>
        </Card.Header>
        <Card.Body>
        <Row>
          <Col>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control
                className="mb-3"
                as="select"
                name="year"
                onChange={changeSelectedYear}
                autoFocus
              >
                {years.map((year) => (
                  <option 
                  value={year}
                  >
                    {year}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
							<Form.Group controlId="formFile" className="mb-3">
                <Form.Control
									className="mb-3"
									as="select"
									name="mounth"
                  onChange={changeSelectedMonth}
                >
                  {[...Array(12)].map((x, i) => (
                    <option 
                    value={i}
                    >
                      {monthName[i]}
                    </option>
                  ))}
                </Form.Control>
            </Form.Group>
          </Col>
        </Row>
          <Row>
            <Col>
              {days.map((day) => (
                <>
                  <Button 
                    index={day.number} 
                    onClick={changeDayState}
                    style={{ width: '8rem', height: '4rem', }}
                    type="button"
                    variant={day.activo ? "success" : "outline-info"}
                    className="m-2"
                  >
                    {day.number + " - " + day.date}
                  </Button>{' '}
                </>
              ))}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
}
