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
}

//this.：親のコンポーネントから渡されたプロパティセットはthis.propsで参照することができます
//JSX構文で{}で囲まれた範囲はTypeScriptのコードとして扱われる
class Detail extends React.Component<DetailProps, {}>{ 
  render() {
    return (
      <div >
        <div className="classification-name">{this.props.classification.name}</div>
        <div className="description">{this.props.classification.description}</div>
        <div className="unit-price">{this.props.classification.unitPrice}円</div>
        <div className="num-people">
          <select value={this.props.classification.numOfPeople}>
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
}

class Summary extends React.Component {
  render() {
    return (
      <div>
        <div className="party">
          <input type="text" className="party" value="0" />
          <span>名様</span>
        </div>
        <div className="total-amount">
          <span>合計</span>
          <input type="text" className="total-amount" value="0" />
          <span>円</span>
        </div>
      </div>
    );
  }
}

class AdmissionFeeCalculator extends React.Component {
  private detail: DetailProps = {
    classification:{
      name: "所得割課税額397,000円以上",
      description: "",
      unitPrice: 104000,
      numOfPeople: 0,
      totalPrice: 0
    }
  };

  //親コンポーネントにあたるAdmissionFeeCalculatorでは、Detailコンポーネントにプロパティを渡す必要があります。
  render() {
    return (
      <>
        <Detail classification={this.detail.classification}/>
        <Summary />
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


