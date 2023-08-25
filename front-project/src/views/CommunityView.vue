<template>
    <div class="community">
        <Navbar />
        <div class="sidebar">
            <div>
                <el-input
                    placeholder="搜索成员或部门"
                    prefix-icon="el-icon-search"
                    v-model="input_search"
                    class="custom-input">
                </el-input>
            </div>
            <div class="department-title">
                团队       
            </div>
            <div>
                <el-select v-model="department_value" placeholder="请选择">
                    <el-option
                    v-for="item in department_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
                
            <div class="manage-button">
                <el-button v-if="isEdit === false" type="success" @click="isEdit = true">管理成员</el-button>
                <el-button v-else type="success" @click="isEdit = false">完成编辑</el-button>
            </div>
        </div>
        <div class="memberArea">
            <div>
            <el-row>
                <el-col :span="20"><div class="departmentName">这里是企业名称 · 114←这是企业成员数</div></el-col>
                <el-col :span="1"><i class="el-icon-circle-plus"></i></el-col>
                <el-col :span="3"><div class="memberAdd">添加成员</div></el-col>
            </el-row>
            </div>
            <el-divider></el-divider>
            <div>
                <div class="member-title">
                    <el-row class="member-row">
                        <el-col :span="8">姓名</el-col>
                        <el-col :span="4">手机号</el-col>
                        <el-col :span="4">部门</el-col>
                        <el-col :span="5">职位</el-col>
                        <el-col :span="3">角色</el-col>
                    </el-row>
                </div>
                <div class="member-detail">
                    <el-row>
                        <el-col :span="2"><el-avatar :size="small" :src="circleUrl"></el-avatar></el-col>
                        <el-col :span="6" class="member-detail-message">Xenon</el-col>
                        <el-col :span="4" class="member-detail-message">手机号</el-col>
                        <el-col :span="4" class="member-detail-message">部门</el-col>
                        <el-col :span="5" class="member-detail-message">职位</el-col>
                        <el-col :span="2" class="member-detail-message"><el-tag size="small" type="danger">拥有者</el-tag></el-col>
                        <el-col :span="1">
                            <el-button v-if="isEdit" type="danger" icon="el-icon-minus" circle  disabled></el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="member-detail">
                    <el-row>
                        <el-col :span="2"><el-avatar :size="small" :src="circleUrl"></el-avatar></el-col>
                        <el-col :span="6" class="member-detail-message">猪^(*￣(oo)￣)^</el-col>
                        <el-col :span="4" class="member-detail-message">手机号</el-col>
                        <el-col :span="4" class="member-detail-message">部门</el-col>
                        <el-col :span="5" class="member-detail-message">职位</el-col>
                        <el-col :span="2" class="member-detail-message"><el-tag size="small" type="success">管理员</el-tag></el-col>
                        <el-col :span="1">
                            <el-button v-if="isEdit" type="danger" icon="el-icon-minus" circle @click="deleteDialogVisible = true"></el-button>
                        </el-col>
                        <el-dialog
                        title="提示"
                        :visible.sync="deleteDialogVisible"
                        width="30%"
                        :before-close="handleDelete">
                            <span>是否删除该成员？</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="deleteDialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="deleteDialogVisible = false">确 定</el-button>
                            </span>
                        </el-dialog>
                    </el-row>
                </div>
                <div class="member-detail">
                    <el-row>
                        <el-col :span="2"><el-avatar :size="small" :src="circleUrl"></el-avatar></el-col>
                        <el-col :span="6" class="member-detail-message">丁真纯一郎</el-col>
                        <el-col :span="4" class="member-detail-message">手机号</el-col>
                        <el-col :span="4" class="member-detail-message">部门</el-col>
                        <el-col :span="5" class="member-detail-message">职位</el-col>
                        <el-col :span="2" class="member-detail-message"><el-tag size="small" type="success">管理员</el-tag></el-col>
                        <el-col :span="1">
                            <el-button v-if="isEdit" type="danger" icon="el-icon-minus" circle @click="deleteDialogVisible = true"></el-button>
                        </el-col>
                        <el-dialog
                        title="提示"
                        :visible.sync="deleteDialogVisible"
                        width="30%"
                        :before-close="handleDelete">
                            <span>是否删除该成员？</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="deleteDialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="deleteDialogVisible = false">确 定</el-button>
                            </span>
                        </el-dialog>
                    </el-row>
                </div>
                <div class="member-detail">
                    <el-row>
                        <el-col :span="2"><el-avatar :size="small" :src="circleUrl"></el-avatar></el-col>
                        <el-col :span="6" class="member-detail-message">BUAAwei</el-col>
                        <el-col :span="4" class="member-detail-message">手机号</el-col>
                        <el-col :span="4" class="member-detail-message">部门</el-col>
                        <el-col :span="5" class="member-detail-message">职位</el-col>
                        <el-col :span="2" class="member-detail-message"><el-tag size="small" >成员</el-tag></el-col>
                        <el-col :span="1">
                            <el-button v-if="isEdit" type="danger" icon="el-icon-minus" circle @click="deleteDialogVisible = true"></el-button>
                        </el-col>
                        <el-dialog
                        title="提示"
                        :visible.sync="deleteDialogVisible"
                        width="30%"
                        :before-close="handleDelete">
                            <span>是否删除该成员？</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="deleteDialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="deleteDialogVisible = false">确 定</el-button>
                            </span>
                        </el-dialog>
                    </el-row>
                </div>
            </div>
        </div>
    </div>

</template>
  
  <script>
  import Navbar from '@/components/Navbar.vue'

  export default {
    name: 'Community',
    components: {
        Navbar
    },
    data() {
        return {
            input_search: '',
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            department_options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            department_value: '',
            deleteDialogVisible: false,
            isEdit: false,
        };
    },
    methods: {
      handleDelete(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
    .sidebar {
        position: fixed;
        top: 6rem;
        left: 300px;
        bottom: 0;
        z-index: 100;
        padding: 1rem;
        width: 15%;
        overflow-y: scroll;
        background-color: rgba(212, 219, 224, .90) !important;
    }
    .sidebar::-webkit-scrollbar {
        display: none;
    }
    .custom-input {
        margin-top: 21px;
    }
    .memberArea {
        position: fixed;
        top: 6rem;
        left: 640px;
        bottom: 0;
        z-index: 100;
        padding: 1rem;
        width: 50%;
        overflow-y: scroll;
        background-color: rgba(241, 241, 241, 0.9) !important;
    }
    .memberArea::-webkit-scrollbar {
        display: none;
    }
    .departmentName {
        font-size: 18px;
    }
    .plus {
        font-size: 20px;
    }
    .el-icon-circle-plus {
        position: relative;
        top: 4px;
        color: #0080ff;
    }
    .memberAdd {
        font-size: 18px;
        color: #0080ff;
    }
    .member-row {
        font-size: 15px;
    }
    .member-title {
        background-color: #4c4d4e;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 7px;
        margin-left: 15px;
        margin-right: 30px;
    }
    .member-detail {
        margin-bottom: 20px;
        margin-top: 20px;
        padding-left: 17px;
        padding-right: 30px;
    }
    .member-detail-message {
        padding-top: 8px;
    }
    .department-title {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .department {
        padding: 0 180px 0 15px !important;
    }
    .manage-button {
        position: absolute;
        top: 205px;
        right: 109px;
    }
  </style>