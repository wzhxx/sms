<template>
	<div class="index">
		<h1>学生信息管理系统</h1>

		<el-table :data="tableData" stripe style="width: 100%" id="out-table">

			<el-table-column prop="name" label="姓名">
			</el-table-column>
			<el-table-column prop="sex" label="性别">
			</el-table-column>
			<el-table-column prop="age" label="年龄">
			</el-table-column>
			<el-table-column prop="moblie" label="手机号">
			</el-table-column>

			<el-table-column prop="address" label="地址">
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" @click="editData(scope.$index)">修改</el-button>
					<el-button type="danger" @click="openDialog(scope.$index)">删除</el-button>
				</template>
			</el-table-column>

		</el-table>

		<el-row>
			<el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
			<el-button type="primary" @click="exportExcel">导出</el-button>
			<el-button type="primary" @click="isImport = true">导入</el-button>
		</el-row>

		<el-dialog title="导入文件" :visible.sync="isImport" width="20%">
			<div class="chooseFile">选择文件
				<input id="upload" class="upload" type="file" @change="importTable(this)" accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
			
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isImport = false">取 消</el-button>
			</div>
		</el-dialog>

		<el-dialog title="填写你的信息" :visible.sync="dialogFormVisible">
			<el-form :model="form" :rules="rules" ref="form">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-input v-model="form.sex" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="年龄" prop="age">
					<el-input v-model="form.age" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号" porp="phoneNumber">
					<el-input v-model="form.moblie" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="家庭地址">
					<el-input v-model="form.adress" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitFrom">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>确定要删除信息</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="delData">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import FileSaver from 'file-saver'
	import XLSX from 'xlsx'
	export default {
		name: "index",
		data() {
			var checkAge = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('年龄不能为空'));
				}
				setTimeout(() => {
					console.log(value)
					console.log(Number.isInteger(value))
					if (!Number.isInteger(value)) {
						callback(new Error('请输入数字值'));
					} else {
						if (value < 18) {
							callback(new Error('必须年满18岁'));
						} else {
							callback();
						}
					}
				}, 1000);
			};
			return {
				tableText: '学生表',
				isImport: false,
				dialogVisible: false,
				tableData: [],
				dialogFormVisible: false,
				isEdit: false, //是否修改
				editId: '',
				delId: '',
				form: {
					name: "",
					sex: "",
					age: '',
					moblie: null,
					address: ""
				},
				rules: {}
			}
		},

		methods: {
			sendRequest(url, opt = {}) {
				this.$http.post(url, opt).then(function(res) {
						console.log(res)
					})
					.catch(function(error) {
						console.log(error)
					})
			},
			submitFrom() {
				const that = this
				this.$refs['form'].validate((valid) => {
					if (valid) {
						if (that.isEdit) {
							let opt = that.form
							opt._id = that.editId
							// 修改
							that.sendRequest('/api/editStudent', opt)
						} else {
							// 新增
							that.sendRequest('/api/addStudent', that.form)
						}

						that.dialogFormVisible = false
						that.getAllData()
					} else {
						console.log('error submit!!');
						return false;
					}
				});


			},

			// 请求所有数据
			getAllData() {
				var _this = this
				this.$http.get('/api/student').then(function(res) {
						console.log(res)
						_this.tableData = res.data
					})
					.catch(function(error) {
						console.log(error)
					})

			},

			editData(index) {
				const selfData = this.tableData[index]
				this.editId = selfData._id
				this.dialogFormVisible = true
				this.isEdit = true
				this.form.name = selfData.name
				this.form.sex = selfData.sex
				this.form.age = selfData.age
				this.form.moblie = selfData.moblie
				this.form.address = selfData.address

				// this.$http.post('/api/editStudent', {_id: id}).then(function (res) {
				//  console.log(res)
				// })
			},

			openDialog(index) {
				this.delId = this.tableData[index]._id
				this.dialogVisible = true

			},

			delData() {
				this.sendRequest('/api/delStudent', {
					id: this.delId
				})
				this.dialogVisible = false
				this.getAllData()
			},

			exportExcel() {
				/* generate workbook object from table */
				var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
				/* get binary string as output */
				var wbout = XLSX.write(wb, {
					bookType: 'xlsx',
					bookSST: true,
					type: 'array'
				})
				try {
					FileSaver.saveAs(new Blob([wbout], {
						type: 'application/octet-stream'
					}), this.tableText + '.xlsx')
				} catch (e) {
					if (typeof console !== 'undefined') console.log(e, wbout)
				}
				return wbout
			},
			importTable(obj) {
				let _this = this;
				console.log(this.$refs)
				let inputDOM = this.$refs.inputer; // 通过DOM取文件数据
				this.file = event.currentTarget.files[0];
				var rABS = false; //是否将文件读取为二进制字符串
				var f = this.file;
				var reader = new FileReader();
				//if (!FileReader.prototype.readAsBinaryString) {
				FileReader.prototype.readAsBinaryString = function(f) {
					var binary = "";
					var rABS = false; //是否将文件读取为二进制字符串
					var pt = this;
					var wb; //读取完成的数据
					var outdata;
					var reader = new FileReader();
					reader.onload = function(e) {
						var bytes = new Uint8Array(reader.result);
						var length = bytes.byteLength;
						for (var i = 0; i < length; i++) {
							binary += String.fromCharCode(bytes[i]);
						}
						if (rABS) {
							wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
								type: 'base64'
							});
						} else {
							wb = XLSX.read(binary, {
								type: 'binary'
							});
						}
						// outdata就是你想要的东西 excel导入的数据
						outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
						// excel 数据再处理
						let arr = []
						outdata.map(v => {
							let obj = {}
							obj.name = v.姓名
							obj.sex = v.性别
							obj.age = v.年龄
							obj.mobile = v.手机号
							obj.address = v.地址
							arr.push(obj)
						})
						console.log(arr)

						_this.tableData = _this.tableData.concat(arr);
						console.log(_this.tableData)

						_this.sendRequest('/api/addStudent', arr)
						_this.isImport = false
						// window.location.reload();
					}
					reader.readAsArrayBuffer(f);
				}
				if (rABS) {
					reader.readAsArrayBuffer(f);
				} else {
					reader.readAsBinaryString(f);
				}
			}
		},

		watch: {
			dialogFormVisible() {
				if (!this.dialogFormVisible) this.isEdit = false
			}
		},
		mounted: function() {
			this.getAllData();
		}


	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.index .el-table--fit {
		max-width: 1200px;
		margin: 0 auto;
	}

	.el-row {
		margin-top: 2em;
	}

	.chooseFile {
		display: inline-block;
		width: 100px;
		height: 40px;
		    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		text-align: center;
		line-height: 40px;
		text-decoration: none;
		font-size: 14px;
		border-radius: 4px;
	}

	.chooseFile .upload {
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
		font-size: 100px;
		filter: alpha(opacity=0);
	}
</style>
