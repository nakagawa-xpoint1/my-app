import React from 'react';
import './App.css';

type FeeClassification = {
	name: string;
	description: string;
	unitPrice: number;
	numOfPeople: number;
	totalPrice: number;
}
	//コンポーネントが利用するpropsの型定義
type DetailProps = {
	//アプリケーション内で共通的に使用する型の定義
	classification: FeeClassification;
  onNumOfPeopleChange: (num: number) => void;
}

//何らかのイベントによって変更が発生しうる状態は、コンポーネント自身のstateとして管理します。
//まずはpropsと同様、stateに対応する型定義を行います。
//stateは親コンポーネントに引き上げて不要になったので、DetailStateは削除します。
// type DetailState = {
//   numOfPeople: number;
// }



//this.：親のコンポーネントから渡されたプロパティセットはthis.propsで参照することができます
//JSX構文で{}で囲まれた範囲はTypeScriptのコードとして扱われる
//React.Componentを継承する際の二つ目の型パラメータに指定し、コンストラクタではstateを初期化します。

//新しいstateオブジェクトを作成して、setStateメソッドを呼び出して更新

//型はReact.FC<propsの型>とします
//propsを受け取ってJSXを返却するアロー関数として定義します
//これまでthis.propsを参照していた箇所は（引数の）propsを参照する形になりますので注意してください
const Detail: React.FC<DetailProps> = props =>{ 

  const onNumOfPeopleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
    const num: number = Number(e.target.value);
    props.onNumOfPeopleChange(num);
  }
  
//renderメソッドのJSXでは、select要素にイベントハンドラを記述します
  // render() {
    return (
      <div >
        <div className="classification-name">{props.classification.name}</div>
        <div className="description">{props.classification.description}</div>
        <div className="unit-price">{props.classification.unitPrice}円</div>
        <div className="num-people">
          <select value={props.classification.numOfPeople}
            onChange={e => onNumOfPeopleChange(e)}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <span>名</span>
        </div>
      </div>
    );
  }


type SummaryProps = {
  numOfPeople: number;
  totalAmount: number;
}

const Summary: React.FC<SummaryProps> = props => {
    return (
      <div>
        <div className="party">
          <input type="text" className="party" value={props.numOfPeople} />
          <span>名様</span>
        </div>
        <div className="total-amount">
          <span>合計</span>
          <input type="text" className="total-amount" value={props.totalAmount} />
          <span>円</span>
        </div>
      </div>
    );
  }


type AdmissionFeeCalculatorState = {
  feeClassifications: FeeClassification[];
}

class AdmissionFeeCalculator extends React.Component<{}, AdmissionFeeCalculatorState> {
constructor(props: {}){
  super(props);
  const adults: FeeClassification = {
    name: "大人",
    description: "",
    unitPrice: 1000,
    numOfPeople: 0,
    totalPrice: 0,
  };
  const students: FeeClassification ={
    name: "学生",
    description: "中学生・高校生",
    unitPrice: 700,
    numOfPeople: 0,
    totalPrice: 0,
  };
  const children: FeeClassification = {
    name: "子ども",
    description: "小学生",
    unitPrice: 300,
    numOfPeople: 0,
    totalPrice: 0,
  };
  const infants: FeeClassification = {
    name: "幼児",
    description: "未就学",
    unitPrice: 0,
    numOfPeople: 0,
    totalPrice: 0,
  };
  this.state = { feeClassifications: [adults, students, children, infants]};
}

//Detailコンポーネントで発生したChangeイベントを処理するハンドラメソッドをAdmissionFeeCalculatorコンポーネントに作成します。
//stateを直接変更できないから、新しいstateオブジェクトを作成して、下でsetStateメソッドを呼び出す
handleNumOfPeopleChange(idx: number, num: number){
  const currentFC = this.state.feeClassifications[idx];
  const newTotalPrice = currentFC.unitPrice * num;

  //人数と合計額以外は既存の値をコピー
  const newFC: FeeClassification = 
  Object.assign({}, currentFC, { numOfPeople: num, totalPrice: newTotalPrice});
  //新たな配列を生成
  const feeClassifications = this.state.feeClassifications.slice();
  feeClassifications[idx] = newFC;

  //stateの更新 新しいstateオブジェクトを作成してsetStateメソッドを呼び出す手順となります。
  this.setState({ feeClassifications: feeClassifications});
}



  //親コンポーネントにあたるAdmissionFeeCalculatorでは、Detailコンポーネントにプロパティを渡す必要があります。
  //先ほど定義したhandleNumOfPeopleChangeメソッドを呼び出すアロー関数を記述します。
  render() {
    const details = this.state.feeClassifications.map((fc, idx) => {
      return (
        <Detail key ={idx.toString()} classification={fc} 
          onNumOfPeopleChange = {n => this.handleNumOfPeopleChange(idx, n)}/>
      );
    });
    const numOfPeople = this.state.feeClassifications
    .map(fc => fc.numOfPeople).reduce((p, c) => p + c);
    const totalAmount = this.state.feeClassifications
    .map(fc => fc.totalPrice).reduce((p, c) => p + c);

    return (
      <>
        {details}
        <Summary numOfPeople={numOfPeople} totalAmount={totalAmount} />
      </>
    );
  }
  
}

const App: React.FC = () => {
  return (
    <div className="main">
      <AdmissionFeeCalculator />
    </div>
  );
}

export default App;


